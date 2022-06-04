const express = require('express')
const axios = require('axios')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()
app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT || 8080
const activityRouter = require('./route/activity')
const orderRouter = require('./route/order')
const ticketRouter = require('./route/ticket')

app.use(morgan('dev'))

const USER_ACTIVITY_API = process.env.USER_ACTIVITY_API
const TICKET_API = process.env.TICKET_API
const JWT_KEY = process.env.JWT_KEY

if ([USER_ACTIVITY_API, TICKET_API, JWT_KEY].some((k) => !k)) {
  throw new Error('env not defined')
}

app.post('/api/signup', async (req, res) => {
  const userInfo = req.body
  try {
    const signupRes = await axios.post(`${USER_ACTIVITY_API}/users`, userInfo)
    res.send(signupRes.body)
  } catch (err) {
    res.status(400).send('signup failed!')
  }
})

app.post('/api/login', (req, res) => {
  const user = {
    first_name: 'Sam',
    last_name: 'Wang',
    email: 'abc12345@ntu.edu.tw',
  }
  // expires in one hour
  const token = jwt.sign({ user }, JWT_KEY, { expiresIn: 60 * 60 })
  res.cookie('access_token', token)
  res.send('Login success!')
})

app.use('/api/activities', activityRouter)
app.use('/api/orders', orderRouter)
app.use('/api/tickets', ticketRouter)

app.listen(port, () => {
  console.log(`TicTake app listening on port ${port}`)
})
