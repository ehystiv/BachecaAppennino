const { Router } = require('express')
const Post = require('./../../src/db/schemas/post').model

const router = new Router()

router.get('/getpost', async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author').sort({ date: -1 })

    res.json({ posts })
  } catch (e) {
    console.error(e)
  }
})

module.exports = router
