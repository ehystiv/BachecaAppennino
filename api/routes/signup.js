const { Router } = require('express')
const User = require('./../../src/db/schemas/user').model

const router = new Router()

router.post('/signup', async (req, res, next) => {
  const userData = req.body

  userData.anon_name = getAnonName()

  const result = {
    status: undefined,
    error: undefined,
  }

  try {
    const savedUser = await new User(userData).save()

    if (savedUser) {
      result.status = 'success'
      res.json(result)
    }
  } catch (e) {
    console.error(e)
    if (e.code === 11000) {
      result.status = 'failed'
      result.error = ''
      Object.keys(e.keyValue).forEach((key) => {
        result.error += `${e.keyValue[key]} è già stato utilizzato!\n`
      })
      res.json(result)
    } else res.json({ status: 'failed', error: e.errors })
  }
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

module.exports = router
