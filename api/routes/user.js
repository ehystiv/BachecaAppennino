const { Router } = require('express')
const jwt = require('jsonwebtoken')

const User = require('./../../src/db/schemas/user').model

const router = new Router()

router.post('/user', async (req, res, next) => {
  console.log(req.JWTtoken)

  let data
  try {
    data = jwt.verify(
      req?.headers?.authorization.split(' ')[1],
      process.env.JWT_SECRET
    )
  } catch (e) {
    res.status(403).end()
  }

  const user = await User.findOne({
    uuid: data.uuid.substring(1, data.uuid.lenght),
  })

  res.json({ data: user })
})

module.exports = router
