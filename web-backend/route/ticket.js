const express = require('express')
const axios = require('axios')
const userMiddle = require('./../user-middleware')
const router = express.Router()

const TICKET_API = process.env.TICKET_API

router.use(userMiddle)

// list all ticket owned by user
router.get('/', async (req, res) => {
  const { email } = req.user
  let data
  try {
    const result = await axios.get(`${TICKET_API}/search_ticket/`, { params: { member: email } })
    data = result.data
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).send('error\n' + error.response.data)
    }
    return res.status(500).send('error\n' + error)
  }
  res.send(data)
})

module.exports = router
