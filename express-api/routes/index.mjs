import express from "express"
var router = express.Router()

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" })
})

const indexRouter = router
export default indexRouter
