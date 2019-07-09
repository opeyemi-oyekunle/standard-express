const express = require('express')
const router = express.Router()
const add = require('../queries/addQuery')
const find = require('../queries/findQuery')
const passport = require('passport')
const Post = require('../models/post')

//add data to post
router.post('/post', passport.authenticate("jwt", { session: false }), (req, res)=>{
  add(Post, req.body, res)
})

//get a post
router.get('/post/:id', passport.authenticate("jwt", { session: false }), (req, res)=>{
  find.one(Post, {id:req.params.id}, res)
})

//get all post
// router.get('/post', passport.authenticate("jwt", { session: false }), (req, res)=>{
router.get('/post', (req, res)=>{
  find.all(Post, {}, res)
})

//get all user's post
router.get('/post/user/:userId', passport.authenticate("jwt", { session: false }), (req, res)=>{
  find.one(Post, {user:req.params.userId}, res)
})

//get one user's post
router.get('/post/user/:user/:id', passport.authenticate("jwt", { session: false }), (req, res)=>{
  const {user, id} = req.params
  find.one(Post, {user, id}, res)
})

module.exports = router
