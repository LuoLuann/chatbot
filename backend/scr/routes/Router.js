const express = require("express")
const router = express()

router.use('/api', require('./ChatbotRoutes'))
router.get('/', (req, res) => {
    res.send('API working')
})

module.exports = router
