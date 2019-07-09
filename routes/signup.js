const express = require('express')
const router = express.Router()
const addData = require('../queries/addQuery')
const update = require('../queries/updateQuery')
const Login = require('../models/login')
const Profile = require('../models/profile')
const smtpEmail = require('./sendEmail').smtpEmail

router.post('/signup', (req, res)=>{
  const data = req.body
  data.token = Math.floor((Math.random() * 999999) + 100000)
  data.status = 'inactive'
  Login.create(data, (err, login)=>{
  if (err) res.status(401).send(err.message)
  Profile.create({gender:login.gender,user: login._id}, (err,profile)=>{
    if (err) {
      Login.findOneAndDelete({_id:login._id}, (err, user)=>{
        if (err) {
          res.status(401).send(err.message)
        }
        return false
      })
      res.status(401).send(err.message)
    }
    const options = {
      from: '"Opeyemi" <ope@oaafoundation.com>',
      to: login.email,
      subject: 'Welcome To Our Web Page',
      html:`<div>
              <h1>Congratuations! You are now a member</h1>
              <p>Follow this link <a href='http://localhost:5001/api/verifyAccount/${data.token}/${data.email}'>
              Verify Account</a> to verify your account </p>
            </div>`
    }
    smtpEmail(options, res)
  })
})
})

router.get('/verifyAccount/:token/:email', (req, res)=>{
  const {email, token} = req.params
  update.one(Login, {email, token, status:'inactive'}, {status:'active', token:null}, res)
})

module.exports = router
