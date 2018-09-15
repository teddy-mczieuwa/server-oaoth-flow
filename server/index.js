const express = require('express')
const app = express()
const morgan = require('morgan')
require('./services/passport')
const authRouter = require('./routes/authRoutes')()

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('hi')
})
app.use('/auth', authRouter)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log('App is listening on port ' + PORT))
