const passport = require('passport')
const User = require('../models/user')
const keys = require('../config/keys')

const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})


passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL:'http://localhost:3000/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  User.findOne({googleId: profile.id}).then(existingUser => {
    if (existingUser) {
      done(null, existingUser)
    } else {
      new User({googleId: profile.id}).save()
      .then(user => {
        done(null, user)
      })
    }
  })
  console.log(accessToken)
}))
