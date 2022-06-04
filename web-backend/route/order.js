const express = require('express')
const axios = require('axios')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
const userMiddle = require('./../user-middleware')
const router = express.Router()
const Redis = require('ioredis')
const { v4: uuidv4 } = require('uuid')

const TICKET_API = process.env.TICKET_API
const REDIS_EXPIRE_TIME_IN_SECONDS = process.env.REDIS_EXPIRE_TIME_IN_SECONDS
const redis = new Redis({
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || '127.0.0.1',
})

router.use(userMiddle)

router.post('/', async (req, res) => {
  // activity id, user
  const now = dayjs.tz()
  const email = req.user.email
  const activityId = req.body.activity_id
  const ts = now.utc().format('YYYYMMDDHHmmss')
  const orderId = uuidv4()
  const ticketKey = `${email}#${activityId}#${ts}`

  const result = await redis.get('uid')
  if (!result) {
    await redis.set(orderId, ticketKey, 'EX', REDIS_EXPIRE_TIME_IN_SECONDS || 60)
  }
  // TODO: send to Kafka
  const order = {
    member: email,
    activity_id: activityId,
    order_timestamp: now.format('YYYY-MM-DD HH:mm:ss'),
  }
  simulateAsyncKafka(order)

  // return order id
  return res.send({ order_id: orderId })
})

router.get('/:orderId', async (req, res) => {
  // return order status
  const ticketKey = await redis.get(req.params.orderId)
  if (!ticketKey) {
    return res.status(404).send('Order not found').end()
  }
  console.log({ ticketKey })
  let data
  try {
    const result = await axios.get(`${TICKET_API}/get_ticket/${encodeURIComponent(ticketKey)}`)
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

async function simulateAsyncKafka(order) {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  await sleep(process.env.SIM_WAITING_TIME || 3 * 1000)
  console.log('start creating ticket')
  try {
    const { data } = await axios.post(`${TICKET_API}/add_ticket_order/`, order)
    console.log(data)
  } catch (error) {
    console.log(error)
  } finally {
    console.log('create ticket finish')
  }
}
