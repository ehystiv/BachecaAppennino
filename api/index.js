const express = require('express')
const bodyParser = require('body-parser')

const connectToDB = require('./../src/db/connectToDB')

try {
  // Create express instance
  const app = express()

  // Require API routes
  const signup = require('./routes/signup')
  const login = require('./routes/login')
  const user = require('./routes/user')
  const postit = require('./routes/postit')
  const getpost = require('./routes/getposts')
  const addfrazione = require('./routes/addfrazione')
  const changepass = require('./routes/changepass')

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(signup)
  app.use(login)
  app.use(user)
  app.use(postit)
  app.use(getpost)
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
