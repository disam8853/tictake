const express = require('express')
const router = express.Router()

// create order
router.post('/', (req, res) => {
  // activity id, user
  // return order id
  res.send('Hello World!!')
})

router.get('/{orderId}', (req, res) => {
  // return order status
  res.send('Hello World!!')
})

module.exports = router
