const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('dotenv').config()

const lexicalRouter = require('./routes/lexical')
const wordRouter = require('./routes/words')
const userRouter = require('./routes/users')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/complexity', lexicalRouter)
app.use('/words', wordRouter)
app.use('/auth', userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  debugger
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.error(err)
  res.status(err.status || 500).json({ error: err })
})

module.exports = app
