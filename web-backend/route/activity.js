const express = require('express')
const router = express.Router()

// list all activities
router.get('/', (req, res) => {
  res.send('Hello World!!')
})

router.get('/{activitiesId}', (req, res) => {
  res.send('Hello World!!')
})

// create activity
router.post('/', (req, res) => {
  res.send('Hello World!!')
})

module.exports = router
