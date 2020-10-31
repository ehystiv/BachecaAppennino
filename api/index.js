const express = require('express')
const bodyParser = require('body-parser')

const connectToDB = require('./../src/db/connectToDB')

try {
  // Create express instance
  const app = express()

  // Require API routes
  const validateToken = require('./validateToken')
  const auth = require('./routes/auth')
  const post = require('./routes/post')
  const addfrazione = require('./routes/addfrazione')
  const changepass = require('./routes/changepass')

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(validateToken)

  app.use('/auth', auth)
  app.use(post)
  app.use(addfrazione)
  app.use(changepass)

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
