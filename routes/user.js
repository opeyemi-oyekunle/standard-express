const express = require('express')
const router = express.Router()
const update = require('../queries/updateQuery')
const find = require('../queries/findQuery')
const remove = require('../queries/deleteQuery')
const Profile = require('../models/profile')
const Login = require('../models/login')
const passport = require('passport')
const fs = require('fs')
const path = require('path')

//update a user's profile
router.patch('/profile', passport.authenticate("jwt", { session: false }), (req, res)=>{
  update.one(Profile, {user:req.body.id}, req.body, res)
})

//get a user profile
router.get('/profile/:id', passport.authenticate("jwt", { session: false }), (req, res)=>{
  find.one(Profile, {user:req.params.id}, res)
})

//get all users profile
// router.get('/profile', passport.authenticate("jwt", { session: false }), (req, res)=>{
router.get('/profile', (req, res)=>{
  find.all(Profile, {}, res)
})

//remove a user
router.delete('/profile', (req, res)=>{
  remove.one(Login, req.body, res)
  remove.one(Profile, req.body, res)
  remove.all(Post, req.body, res)
})

const multer  = require('multer')
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../images'))
  },
  filename (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({storage})

router.post('/profile', upload.single('image'), passport.authenticate("jwt", { session: false }), (req, res, next)=>{
  const img = fs.readFileSync(req.file.path);
  const encodeImage = img.toString('base64');
   const image = [{
        contentType: req.file.mimetype,
        image: Buffer.from(encodeImage, 'base64')
     }]
     update.one(Profile, {user:req.body.id}, {image}, res)
})

router.get('/image/:id', (req, res) => {
  const user = req.params.id;
  Profile.findOne({user})
  .then(data=>{
     res.contentType('image/jpeg')
     res.send(data.image[0].image.buffer)
  })
  .catch(err=>res.send('error'))
})

module.exports = router
