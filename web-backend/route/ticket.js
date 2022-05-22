const express = require('express')
const router = express.Router()

// list all ticket owned by user
router.get('/', (req, res) => {
  res.send('Hello World!!')
})

module.exports = router
