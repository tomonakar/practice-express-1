import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"
import createError from "http-errors"
import helmet from "helmet"

import indexRouter from "./routes/index"
import usersRouter from "./routes/users"
import photosRouter from "./routes/photos"

const dirname = path.dirname(new URL(import.meta.url).pathname)

var app = express()
app.use(helmet())

// view engine setup
app.set("views", path.join(dirname, "views"))
app.set("view engine", "pug")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(dirname, "public")))

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

// module.exports = app
export default app
