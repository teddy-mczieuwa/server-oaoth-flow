const passport = require('passport')
const User = require('../models/user')
const keys = require('../config/keys')

const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL:'http://localhost:3000/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  console.log(profile.id)
}))
