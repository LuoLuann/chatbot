const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new mongoose.Schema(
  {
    content: String,
    timestamps: Date,
    role: String
  })


const chatbotSchema = new mongoose.Schema(
  {
    botName: String,
    version: String,
    instructions: String,
    contentParts: [],
    messages: [messageSchema]

  }
);

const Chatbot = mongoose.model("Chatbot", chatbotSchema, 'chatbots');

module.exports = Chatbot;
