const mongoose = require('mongoose')
const validate = require('mongoose-validator')

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 15],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only',
  }),
]

const Post = new mongoose.Schema({
  date:{
    type:Date,
    default:Date.now()
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Login'
  },
  title:String,
  subject:String
})

module.exports = mongoose.model('Post', Post)
