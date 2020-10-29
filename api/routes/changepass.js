const { Router } = require('express')
const jwt = require('jsonwebtoken')
const User = require('./../../src/db/schemas/user').model

const router = new Router()

router.post('/changepass', async (req, res, next) => {
  let uuid

  try {
    uuid = jwt.verify(
      req?.headers?.authorization.split(' ')[1],
      process.env.JWT_SECRET
    ).uuid
  } catch (e) {
    res.status(403).end()
    return
  }

  if (uuid.startsWith('#')) uuid = uuid.substring(1, uuid.lenght)

  try {
    await User.findOneAndUpdate(
      { uuid },
      { password: req.body.password },
      { returnOriginal: false }
    )

    res.json({ status: 'success' })
  } catch (e) {
    console.error(e)
    res.json({ status: 'failed' })
  }
})

module.exports = router
