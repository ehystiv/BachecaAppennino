const { Schema, model, Types } = require('mongoose')

const _schema = new Schema({
  title: {
    type: String,
    required: true,
  },

  text: String,

  date: {
    type: Date,
    default: Date.now,
  },

  anon: {
    type: Boolean,
    default: false,
  },

  author: {
    type: Types.ObjectId,
    ref: 'User',
  },

  comment: [
    {
      user: {
        type: Types.ObjectId,
        required: true,
        ref: 'User',
      },

      text: {
        type: String,
        required: true,
      },

      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
})

const _model = model('Post', _schema)

module.exports = {
  model: _model,
  schema: _schema,
}
