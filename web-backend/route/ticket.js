const express = require('express')
const axios = require('axios')
const userMiddle = require('./../user-middleware')
const router = express.Router()
const dayjs = require('dayjs')

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

// create ticket
router.post('/', async (req, res) => {
  // activity id, user
  const order = {
    member: req.user.email,
    activity_id: req.body.activity_id,
    order_timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }
  let data
  try {
    const result = await axios.post(`${TICKET_API}/add_ticket_order/`, order)
    data = result.data
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).send('error\n' + error.response.data)
    }
    return res.status(500).send('error\n' + error)
  }
  // return order id
  return res.send({ order_id: data.key })
})

// ticket ID must be URL encoded
router.get('/:ticketId', async (req, res) => {
  // return order status
  let data
  try {
    const result = await axios.get(`${TICKET_API}/ticket/${encodeURIComponent(req.params.ticketId)}`)
    data = result.data
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).send('error\n' + error.response.data)
    }
    return res.status(500).send('error\n' + error)
  }
  return res.send(data)
})

module.exports = router
