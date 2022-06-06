const express = require('express')
const axios = require('axios')
const userMiddle = require('./../user-middleware')
const dayjs = require('dayjs')
const router = express.Router()

const USER_ACTIVITY_API = process.env.USER_ACTIVITY_API

// list all activities
router.get('/', async (req, res) => {
  let data
  try {
    const result = await axios.get(`${USER_ACTIVITY_API}/api/v1/activity/`)
    data = result.data
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).send('error\n' + error.response.data)
    }
    return res.status(500).send('error\n' + error)
  }
  return res.send(data)
})

router.get('/:activitiesId', async (req, res) => {
  let data
  try {
    const result = await axios.get(`${USER_ACTIVITY_API}/api/v1/activity/${req.params.activitiesId}`)
    data = result.data
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).send('error\n' + error.response.data)
    }
    return res.status(500).send('error\n' + error)
  }
  return res.send(data)
})

// create activity
router.post('/', userMiddle, async (req, res) => {
  const startDate = dayjs(req.body.start_date).tz()
  const endDate = dayjs(req.body.end_date).tz()
  const data = {
    ...req.body,
    user_id: req.user.user_id,
    start_date: startDate.format('YYYY-MM-DD HH:mm:ss'),
    end_date: endDate.format('YYYY-MM-DD HH:mm:ss'),
  }
  console.log(data)
  try {
    await axios.post(`${USER_ACTIVITY_API}/api/v1/activity/`, data)
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).send('error\n' + error.response.data)
    }
    return res.status(500).send('error\n' + error)
  }
  return res.send(data)
})

module.exports = router
