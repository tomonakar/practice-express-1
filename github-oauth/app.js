var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var helmet = require("helmet")
var session = require("express-session")
var passport = require("passport")
var GitHubStrategy = require("passport-github2").Strategy
var SECRET_KEYS = require("./secret_keys")

var GITHUB_CLIENT_ID = SECRET_KEYS.GITHUB_CLIENT_ID
var GITHUB_CLIENT_SECRET = SECRET_KEYS.GITHUB_CLIENT_SECRET

console.log(GITHUB_CLIENT_ID)
passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(obj, done) {
  done(null, obj)
})

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/github/callback",
    },
    function(accessToken, refreshToken, profile, done) {
      // 処理に時間がかかるデータベースへの保存する処理は、
      // Node.js のイベントループ process.nextTick を使う
      process.nextTick(function() {
        return done(null, profile)
      })
    },
  ),
)

var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")
var photosRouter = require("./routes/photos")

var app = express()
app.use(helmet())

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/photos", photosRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
