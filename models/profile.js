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

const Profile = new mongoose.Schema({
  fname:{
    type:String,
    default:null,
    nameValidator
  },
  lname:{
    type:String,
    default:null,
    nameValidator
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Login'
  },
  address:{
    type:String,
    default:null
  },
  state:{
    type:String,
    default:null
  },
  country:{
    type:String,
    default:null
  },
  gender:{
    type:String,
    enum:['male', 'female']
  },
  age:{
    type:Number,
    default:null
  },
  image:[]
})

module.exports = mongoose.model('Profile', Profile)
