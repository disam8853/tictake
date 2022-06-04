const jwt = require('jsonwebtoken')

const JWT_KEY = process.env.JWT_KEY

function getUser(req, res, next) {
  const jwtToken = req.cookies.access_token
  if (!jwtToken) {
    return res.status(401).send('Unauthorized').end()
  }
  let user
  try {
    user = jwt.verify(jwtToken, JWT_KEY).user
  } catch (error) {
    return res.status(401).send('Unauthorized').end()
  }
  req.user = user
  return next()
}

module.exports = getUser
