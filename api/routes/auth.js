const { Router } = require('express')
const { compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('./../../src/db/schemas/user').model

const router = new Router()

router.post('/signup', async (req, res, next) => {
  const userData = req.body

  if (!userData) {
    res.status(473).end()
    return
  }

  userData.anon_name = getAnonName()

  try {
    const savedUser = await new User(userData).save()

    if (savedUser) res.json({ status: 'success' })
  } catch (e) {
    console.error(e)
    if (e.code === 11000) {
      let error = ''
      Object.keys(e.keyValue).forEach(
        (key) => (error += `${e.keyValue[key]} è già stato utilizzato!\n`)
      )
      res.json({ status: 'failed', error })
    } else res.json({ status: 'failed', error: e.errors })
  }
})

router.post('/login', async (req, res, next) => {
  const loginInfo = req.body

  if (!loginInfo.email || !loginInfo.password) {
    res.status(473).end()
    console.warn('Empty body')
  }

  try {
    const user = await User.findOne({ email: loginInfo.email })

    if (!user) {
      res.status(471).end()
      console.warn('No user')
      return
    }

    if (!compareSync(loginInfo.password, user.password)) {
      res.status(472).end()
      console.warn('Wrong password')
      return
    }

    const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_SECRET)

    res.status(200).json({ token })
  } catch (e) {
    console.error(e)
    res.status(474).end()
  }
})

router.post('/user', async (req, res, next) => {
  let data
  try {
    data = jwt.verify(
      req?.headers?.authorization.split(' ')[1],
      process.env.JWT_SECRET
    )
  } catch (e) {
    res.status(403).end()
    console.warn('Bad token')
  }

  const user = await User.findOne({
    uuid: data.uuid,
  }).select('-password -__v')

  res.json({ data: user })
})

function getAnonName() {
  const names = [
    'Cinghiale anonimo',
    'Capriolo anonimo',
    'Tasso anonimo',
    'Volpe anonima',
    'Tortora anonima',
    'Cervo anonimo',
    'Villeggiante anonimo',
  ]

  return names[Math.floor(Math.random() * names.length)]
}
