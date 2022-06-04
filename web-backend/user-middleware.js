const jwt = require('jsonwebtoken')

const JWT_KEY = process.env.JWT_KEY

function getUser(req, res, next) {
  const jwtToken = req.cookies.access_token
  if (!jwtToken) {
    res.status(401).send('Unauthorized')
  }
  let user
  try {
    user = jwt.verify(jwtToken, JWT_KEY).user
  } catch (error) {
    res.status(401).send('Unauthorized')
  }
  req.user = user
  next()
}

module.exports = getUser
