const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  req.JWT = {
    token: req?.headers?.authorization?.split(' ')[1] ?? null,
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
