const express = require('express')
const router = express.Router()

const { createChatbot, getChatbots, chatCompletion, getChatHistory } = require('../controllers/ChatbotController')
const {fileUpload} = require('../middlewares/fileUpload')

router.post('/create-chatbot', fileUpload.single('file'), createChatbot);
router.get('/', getChatbots);
router.post('/chat/:id', chatCompletion)
router.get('/chat/:id', getChatHistory);


module.exports = router
