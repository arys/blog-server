const jwt = require('jsonwebtoken')

function sign(data) {
  return jwt.sign(data, process.env.SECRET_KEY)
}

function verify(token) {
  return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = { sign, verify }