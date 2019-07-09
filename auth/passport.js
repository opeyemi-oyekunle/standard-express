const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Login = require('../models/login')
const keys = require('../config/keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

//Using a passport strategy(configuring strategy)
const strategy = (passport)=>{
  passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
    Login.findOne({email: jwt_payload.email}, (err, user)=>{
        if (err) return done(err, false)
        if (user && user.password === jwt_payload.password) {
          return done(null, user)
        } else {
          return done(null, false)
        }
    });
}))
}

module.exports = strategy
