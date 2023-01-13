require('dotenv').config({path: './.env'});
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')

var usersRouter = require('./routes/users')
var platformsRouter = require('./routes/platforms')
var completionsRouter = require('./routes/completions')
var playedGamesRouter = require('./routes/playedGames')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', usersRouter)
app.use('/platforms', platformsRouter)
app.use('/completions', completionsRouter)
app.use('/playedGames', playedGamesRouter)

const { connectDB } = require('./mongodb')

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

connectDB()

module.exports = app
