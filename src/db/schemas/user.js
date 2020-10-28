const { Schema, model } = require('mongoose')
const { hashSync } = require('bcrypt')
const { v4 } = require('uuid')

const _schema = new Schema({
  uuid: {
    type: String,
    default: v4(),
    immutable: true,
    get: (v) => '#' + v,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  nickname: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    set: (v) => hashSync(v, Number(process.env.SALT)),
  },

  frazione: String,

  anon_name: {
    type: String,
    required: true,
  },
})

const _model = model('User', _schema)

module.exports = {
  schema: _schema,
  model: _model,
}
