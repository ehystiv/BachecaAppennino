const { Router } = require('express')
const Post = require('../../src/db/schemas/post').model

const router = new Router()

router.get('/getposts', async (req, res, next) => {
  try {
    const posts = await Post.find()
      .select({ __v: 0 })
      .populate('author', {
        _id: 0,
        password: 0,
        __v: 0,
        email: 0,
        frazione: 0,
      })
      .sort({ date: -1 })

    res.json({ posts })
  } catch (e) {
    console.error(e)
  }
})

module.exports = router
// 'nickname uuid anon_name'
