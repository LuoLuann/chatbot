const { Configuration, OpenAIApi } = require('openai');
const axios = require("axios")
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function main() {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions"',
    {
        model: 'gpt-3.5-turbo',
        messages: [{ role: "user", content: "Say this is a test!" }],
        temperature: 0.7,
        max_tokens: 700,
        frequency_penalty: 1
    },
    {
        headers: {
            'Authorization': `Bearer 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`
        }
    }
).then((response) => {
  console.log(response.data);
})
.catch((error) => {
  console.error("Erro ao chamar a API do OpenAI:", error);
});

  console.log(response.choices[0].messages.content);
}

main();
