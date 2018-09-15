const express = require('express');
const passport = require('passport');
const authRoutes = () => {

  const authRouter = express.Router()

  authRouter.route('/google').get(passport.authenticate('google',{
    scope: ['profile', 'email']
  }))

  authRouter.route('/user').get((req,res) => {
    res.send(req.user)
  })

  authRouter.route('/logout').get((req,res) => {
    req.logout()
    res.send(req.user)
  })

  authRouter.route('/google/callback').get(passport.authenticate('google'))

  return authRouter
}

module.exports = authRoutes
