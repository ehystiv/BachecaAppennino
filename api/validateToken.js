const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  req.JWT = {
    token: req?.headers?.authorization?.split(' ')[1],
    isValid() {
      try {
        jwt.verify(this.token, process.env.JWT_SECRET)
        return true
      } catch (e) {
        console.warn('Bad jwt token')
        return false
      }
    },
    getData() {
      return jwt.decode(this.token)
    },
  }

  next()
}
