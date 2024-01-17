const Chatbot = require('../models/Chatbot');
const { getResponseFromOpenAI } = require('../services/OpenaiService')
const fs = require('fs').promises;

const createChatbot = async (req, res) => {
    try {
        const { botName, version, instructions} = req.body;

        if (!req.file) {
            return res.status(400).json({error: "Nenhum arquivo enviado."});
        }

        const fileContent = await fs.readFile(req.file.path, 'utf-8');

        const contentParts = recursiveTextSplitter(fileContent)

        const newChatbot = new Chatbot({
            botName,
            version,
            instructions,
            contentParts
        });
        const savedChatbot = await newChatbot.save();

        console.log(newChatbot)

        await fs.unlink(req.file.path);

        res.status(201).json(savedChatbot);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

function recursiveTextSplitter(text, delimiter = ' ', limit = 500) {
    let parts = []
    let currentPart = ''

    let words = text.split(delimiter)

    for(let word of words) {
        if((currentPart + delimiter + word).length > limit) {
            parts.push(currentPart)
            currentPart = word
        } else {
            currentPart += (currentPart.length > 0 ? delimiter : '') + word
        }
    }
    if(currentPart.length > 0) {
        parts.push(currentPart)
    }
    return parts
}

const getChatbots = async(req, res) => {
    try {
        const chatbots = await Chatbot.find()

        return res.json({ chatbots })

    } catch (error) {
        res.status(500).json({ error: "Error ao listar chatbots" })
    }
}

const getChatHistory = async(req, res) => {
    const {id} = req.params

    try {
        const chatbot = await Chatbot.findById(id)

        if(!chatbot) {
            res.status(422).json({errors: ["Chatbot não encontrado."]})
        }
        res.status(200).json(chatbot.messages)
    } catch(error) {
        res.status(422).json({errors: ["Chatbot não encontrado."]})
    }
}

const chatCompletion = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;

        const chatbot = await Chatbot.findById(id);

        if (!chatbot) {
            return res.status(404).json({ message: "Chatbot não encontrado" });
        }

        const prompt = `${chatbot.instructions}\n${chatbot.contentParts.join('\n')}`;
        
        let messages = [
            ...chatbot.messages.map(m => ({ role: m.role === m.botName? "system" : "user", content: m.content})),
            {
                role: "system",
                content: prompt
            },
            {
                role: "user",
                content: message
            }
        ]

        const openAIResponse = await getResponseFromOpenAI(messages);
        chatbot.messages.push({ role: chatbot.botName, content: openAIResponse});
        await chatbot.save();

        res.status(200).json({ message: openAIResponse });

    } catch (error) {
       res.status(500).json({

           message: error.message
       })
    }
}

module.exports = {
    createChatbot,
    getChatbots,
    chatCompletion,
    getChatHistory
}
