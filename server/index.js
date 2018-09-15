const express = require('express')
const passport = require('passport');
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const keys = require('./config/keys')
mongoose.connect(keys.mongoURL, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('connected to the database')
  }
})
require('./services/passport')
const authRouter = require('./routes/authRoutes')()

app.use(cookieSession({
  maxAge: 30*24*60*60*1000,
  keys:[keys.cookieKey]
}))

app.use(morgan('dev'))
app.use(passport.initialize())
app.use(passport.session())
app.get('/', (req, res) => {
  res.send('hi')
})
app.use('/auth', authRouter)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log('App is listening on port ' + PORT))
