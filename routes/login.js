const express = require('express')
const router = express.Router()
const find = require('../queries/findQuery')
const Login = require('../models/login')
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');

//login and set the Bearer token for authentication
router.post('/login', (req, res)=>{
  const {email, password} = payload = req.body
  try{
    Login.findOne({email, password, status:'active'})
    .then(data=>{
      if(data){
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({data, status:true, message:'You have successfully logged in', token: "Bearer " + token});
        })
      }else {
        res.json({status:false, message:'Password or email incorrect.'})
      }
    })
    .catch(err=>{
      res.json({status:false, message:err.message})
    })
  }catch(err){
    res.json({status:false, message:err.message})
  }
})

module.exports = router
