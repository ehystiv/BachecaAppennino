const { Router } = require('express')

const User = require('../../db/schemas/user').model

const router = new Router()

router.put('/frazione', async (req, res, next) => {
  if (!req.JWT.isValid()) {
    res.status(403).end()
    return
  }

  const data = req.JWT.getData()

  try {
    await User.findOneAndUpdate(
      { uuid: data.uuid },
      { frazione: req.body.frazione },
      { returnOriginal: false }
    )

    res.json({ status: 'success' })
  } catch (e) {
    console.error(e)
    res.json({ status: 'failed' })
  }
})

router.put('/password', async (req, res, next) => {
  if (!req.JWT.isValid()) {
    res.status(403).end()
    return
  }

  const data = req.JWT.getData()

  try {
    await User.findOneAndUpdate(
      { uuid: data.uuid },
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
