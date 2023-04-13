require('dotenv').config({ path: './.env' })
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
const cors = require('cors')
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage });

var usersRouter = require('./routes/users')
var platformsRouter = require('./routes/platforms')
var completionsRouter = require('./routes/completions')
var playedGamesRouter = require('./routes/playedGames')
var favoriteListsRouter = require('./routes/favoriteLists')

var app = express()

app.use(cors())
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.post("/images", upload.single("image"), uploadFiles);
function uploadFiles(req, res) {
  res.send("Successfully uploaded files");
}

app.use('/users', usersRouter)
app.use('/platforms', platformsRouter)
app.use('/completions', completionsRouter)
app.use('/playedGames', playedGamesRouter)
app.use('/favoriteLists', favoriteListsRouter)

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
})

connectDB()

module.exports = app
