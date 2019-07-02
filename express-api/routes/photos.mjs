"use strict"
import express from "express"
const router = express.Router()

const escapeHTML = str => {
  str = str.replace(/&/g, "&amp;")
  str = str.replace(/</g, "&lt;")
  str = str.replace(/>/g, "&gt;")
  str = str.replace(/"/g, "&quot;")
  str = str.replace(/'/g, "&#39;")
  return str
}

router.get("/", (req, res, next) => {
  res.send("Some Photos")
})

router.param("title", (req, res, next, title) => {
  const safeTitle = escapeHTML(title)
  res.send(safeTitle)
  next()
})

router.get("/:title", (req, res, next) => {
  res.end()
})

export default router
