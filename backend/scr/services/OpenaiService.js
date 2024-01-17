require("dotenv").config();

const OpenAI = require('openai');
const axios = require('axios');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getResponseFromOpenAI(messages) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 300,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${openai.apiKey}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao chamar a API da OpenAI:', error);
    throw new Error('Erro ao chamar a API da OpenAI');
  }
};

  module.exports = {
    getResponseFromOpenAI
  };
