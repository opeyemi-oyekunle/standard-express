const mongoose = require('mongoose')

const Login = new mongoose.Schema({
  date:{
    type:Date,
    Default:Date.now()
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  token:String,
  status:{
    type:String,
    enum:['inactive', 'active']
  }
})

module.exports = mongoose.model('Login', Login)
