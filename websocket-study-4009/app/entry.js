"use strict"
import $ from "jquery"
import io from "socket.io-client"
const block = $("#block")
const scalingButton = $("#scaling-button")

scalingButton.click(() => {
  block.animate({ width: "200pt", height: "200pt" }, 2000)
  block.animate({ width: "100pt", height: "100pt" }, 2000)
})

const movingButton = $("#moving-button")

movingButton.click(() => {
  block.animate({ marginLeft: "500px" }, 500)
  block.animate({ marginLeft: "20px" }, 1000)
})

const loadavg = $("#loadavg")

// websocketの接続先を定義
const socket = io("http://localhost:8000")

// websocket接続上で、 server-status イベントが発火したら
// view を受け取ったデータで更新する
// AJAXの時はクライアントサイドでポーリング間隔を指定してたが、websocketではもちろん不要
socket.on("server-status", data => {
  loadavg.text(data.loadavg.toString() + "です！！")
})

socket.on("connect", () => {
  console.log("接続しました")
})

socket.on("disconnect", () => {
  console.log("切断しました")
})
