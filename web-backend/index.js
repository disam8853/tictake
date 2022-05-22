const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())
const port = process.env.PORT || 8080
const activityRouter = require('./route/activity')
const orderRouter = require('./route/order')
const ticketRouter = require('./route/ticket')

const USER_ACTIVITY_API = 'https://api-user-actibity.disam.dizatt.com'

app.post('/api/signup', async (req, res) => {
  const userInfo = req.body
  try {
    const signupRes = await axios.post(`${USER_ACTIVITY_API}/users`, userInfo)
    res.send(signupRes)
  } catch (err) {
    res.status(400).send('signup failed!')
  }
})

app.post('/api/login', (req, res) => {
  const jwt = 'eqwfdakjsdhfa;sdlkjfl;'
  res.cookie('access_token', jwt)
  res.send('Hello World!!')
})

app.use('/api/activities', activityRouter)
app.use('/api/orders', orderRouter)
app.use('/api/tickets', ticketRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
