const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  let token
  if (req && req.headers && req.headers.authorization)
    token = req.headers.authorization.split(' ')[1]
  else token = null

  req.JWT = {
    token,
    isValid() {
      if (this.token === null) return false
      try {
        jwt.verify(this.token, process.env.JWT_SECRET)
        return true
      } catch (e) {
        console.warn('Bad jwt token')
        return false
      }
    },
    getData() {
      if (this.token === null) return {}
      return jwt.decode(this.token)
    },
  }

  next()
}
