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
    const signupRes = await axios.post(`${USER_ACTIVITY_API}/api/v1/user/create`, userInfo)
    res.send(signupRes.body)
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).send('error\n' + error.response.data)
    }
    return res.status(500).send('error\n' + error)
  }
})

app.post('/api/login', async (req, res) => {
  let user = {}
  try {
    const body = {
      email: req.body.email,
      password: req.body.password,
    }
    const { data } = await axios.post(`${USER_ACTIVITY_API}/api/v1/user/login`, body)
    user = data
    console.log(data)
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).send('error\n' + error.response.data)
    }
    return res.status(500).send('error\n' + error)
  }

  // expires in one hour
  const token = jwt.sign({ user }, JWT_KEY, { expiresIn: process.env.JWT_EXP_TIME || 60 * 60 })
  res.cookie('access_token', token)
  res.send('Login success!')
})

app.use('/api/activities', activityRouter)
app.use('/api/orders', orderRouter)
app.use('/api/tickets', ticketRouter)

app.listen(port, () => {
  console.log(`TicTake app listening on port ${port}`)
})
