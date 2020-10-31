const { Router } = require('express')
const jwt = require('jsonwebtoken')

const Post = require('../../src/db/schemas/post').model
const User = require('../../src/db/schemas/user').model

const router = new Router()

function verifyJWT(token, res) {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    return data
  } catch (e) {
    res.status(403).end()
    return false
  }
}

router.get('/post', async (req, res, next) => {
  const id = req.query.id ?? false

  if (id) {
    try {
      const post = await Post.findOne({ _id: id })
        .select({ __v: 0 })
        .populate('author', {
          __v: 0,
          _id: 0,
          email: 0,
          password: 0,
        })
        /* .populate('comment.user', {
        __v: 0,
        _id: 0,
        anon_name: 0,
        email: 0,
        password: 0,
      }) */
        .sort({ 'comment.date': -1 })

      console.log(post)

      if (post) res.json({ staus: 'success', post })
      else res.json({ status: 'failed', error: 'nopost' })
    } catch (e) {
      console.error(e)
      res.json({ status: 'failed', error: e })
    }
  } else {
    try {
      const posts = await Post.find()
        .select({ __v: 0 })
        .populate('author', {
          _id: 0,
          password: 0,
          __v: 0,
          email: 0,
        })
        .sort({ date: -1 })

      res.json({ status: 'success', posts })
    } catch (e) {
      console.error(e)
      res.json({ status: 'failed', error: e })
    }
  }
})

router.post('/post', async (req, res, next) => {
  const data = verifyJWT(req?.headers?.authorization.split(' ')[1], res)

  if (data) {
    const toPost = {
      title: req.body.post.title,
      text: req.body.post.text,
      anon: req.body.post.anon,
      author: req.body.user,
    }

    try {
      await new Post(toPost).save()

      res.json({ status: 'success' })
    } catch (e) {
      console.error(e)
      res.status(500).json({ status: 'failed', error: e })
    }
  }
})

router.put('/post', async (req, res, next) => {
  const data = verifyJWT(req?.headers?.authorization.split(' ')[1], res)

  if (data) {
    if (req.body.comment && req.body.id) {
      const commentText = req.body.comment
      const postID = req.body.postID

      try {
        const user = await User.findOne({ uuid: data.uuid })

        const comment = {
          user: user._id,
          text: commentText,
        }

        await Post.updateOne({ __id: postID }, { $push: { comment } })

        res.json({ status: 'success' })
      } catch (e) {
        console.error(e)
        res.json({ status: 'failed', error: e })
      }
    }
  }
})

router.delete('/post', async (req, res, next) => {
  const data = verifyJWT(req?.headers?.authorization.split(' ')[1], res)

  if (data) {
    const id = req.body.id

    if (!id) res.json({ status: 'failed', error: 'No id' }).end()
    else {
      try {
        await Post.deleteOne({ _id: id })
        res.json({ status: 'success' })
      } catch (e) {
        console.error(e)
        res.json({ status: 'failed', error: e })
      }
    }
  }
})

module.exports = router
