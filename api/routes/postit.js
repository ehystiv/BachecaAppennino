const { Router } = require('express')

const Post = require('./../../src/db/schemas/post').model

const router = new Router()

router.post('/postit', async (req, res, next) => {
  if (!req.isTokenValid) {
    res.status(403).end()
    return
  }

  const toPost = {
    title: req.body.post.title,
    text: req.body.post.text,
    anon: req.body.post.anon,
    author: req.body.user,
  }

  try {
    await new Post({ toPost }).save()

    res.json({ status: 'success' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ status: 'failed', error: e })
  }
})

module.exports = router
