const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const helmet = require('helmet')
const mongoose = require('mongoose')
const multer  = require('multer')
const mongoURI = require('./queries/index').mongoURI
const passport = require('passport')
const strategy = require('./auth/passport')

app.use(helmet())
app.use(passport.initialize())
strategy(passport)

mongoose.connect(mongoURI,
{ useNewUrlParser: true, useCreateIndex: true }, ()=>{
 console.log('Connected to the database');
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.set('useFindAndModify', false)

app.get('/', (req, res)=>{
  res.send('Welcome Page')
})

app.use('/api', require('./routes/login'))
app.use('/api', require('./routes/signup'))
app.use('/api', require('./routes/user'))
app.use('/api', require('./routes/post'))
// app.use('/api', require('./routes/sendEmail'))

app.all('*', (req, res)=>{
  res.status(401).send('Invalid request')
})

if(process.env.NODE_ENV === 'production'){
	app.use(express.static('views/build'))
  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5001
app.listen(PORT, (req, res)=>{
  console.log(`App running on port ${PORT}`)
})
