const express = require('express');
const passport = require('passport');
const authRoutes = () => {

  const authRouter = express.Router()

  authRouter.route('/google').get(passport.authenticate('google',{
    scope: ['profile', 'email']
  }))

  authRouter.route('/').get((req,res) => {
    res.send('hello world')
  })

  authRouter.route('/google/callback').get(passport.authenticate('google'))

  return authRouter
}

module.exports = authRoutes
