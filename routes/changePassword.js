const express = require('express')
const router = express.Router()
const find = require('../queries/findQuery')
const update = require('../queries/updateQuery')
const Login = require('../models/login')

//final password change
router.patch('/change-password/', (req, res)=>{
  const {email, token, password} = req.body
  if (find.one(Login, {email, token}, res).statusCode === 200) {
    update.one(Login, {email, token}, {password, token:null}, res)
  }
})

//request for password change
router.post('/set-password-token/', (req, res)=>{
  const {email, token} = req.body
  update.one(Login, {email, token}, {password, token:null}, res)
})


module.exports = router
