const mongoose = require('mongoose')
const db = mongoose.connection

module.exports = function () {
  if (db.readyState === 0) {
    db.on('error', console.error.bind(console, 'Errore di connessione:'))
    db.once('open', () => console.info('DB connesso correttamente'))

    let connectionUrl

    if (process.env.NODE_ENV === 'production')
      connectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.MONGO_URL}/${process.env.DB_NAME}?retryWrites=true`
    else
      connectionUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_IP_DEV}:${process.env.DB_PORT}/${process.env.DB_NAME_TEST}`

    mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      authSource: process.env.DB_AUTH,
    })
  }
}
