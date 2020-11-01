const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const connectToDB = require('./../src/db/connectToDB')

try {
  // Create express instance
  const app = express()

  // Require API routes
  const validateToken = require('./validateToken')
  const auth = require('./routes/auth')
  const post = require('./routes/post')
  const userInfo = require('./routes/userInfo')

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(validateToken)
  app.use(
    morgan(
      '[ from :remote-addr ] :method :http-version \t:url \tstatus::status - :response-time ms'
    )
  )

  app.use('/auth', auth)
  app.use(post)
  app.use('/userinfo', userInfo)

  connectToDB()

  // Export express app
  module.exports = app

  // Start standalone server if directly running
  if (require.main === module) {
    const port = process.env.PORT || 3001
    app.listen(port, () => {
      console.log(`API server listening on port ${port}`)
    })
  }
} catch (e) {
  console.error(e)
}
