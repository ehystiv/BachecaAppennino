const { Router } = require('express')
const { compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('./../../src/db/schemas/user').model

const router = new Router()

router.post('/login', async (req, res, next) => {
  const loginInfo = req.body

  try {
    const user = await User.findOne({ email: loginInfo.email })

    if (!user) {
      res.status(471).end()
      return
    }

    if (!compareSync(loginInfo.password, user.password)) {
      res.status(472).end()
      return
    }

    const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_SECRET)

    res.status(200).json({ token })
  } catch (e) {
    console.error(e)
  }
})

module.exports = router
