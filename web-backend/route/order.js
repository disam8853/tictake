const express = require('express')
const axios = require('axios')
const dayjs = require('dayjs')
const userMiddle = require('./../user-middleware')
const router = express.Router()

const TICKET_API = process.env.TICKET_API

router.use(userMiddle)

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

// order ID must be URL encoded
router.get('/:orderId', async (req, res) => {
  // return order status
  let data
  try {
    const result = await axios.get(`${TICKET_API}/get_ticket/${encodeURIComponent(req.params.orderId)}`)
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
