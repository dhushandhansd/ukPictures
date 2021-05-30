const express = require("express");
const app = express()
const fs = require("fs");

app.use(express.static(__dirname));

app.listen("3000", (error) => {
  if(error) {
    console.log("Server Starting Error");
  } else {
    console.log("Server started at Port 3000");
  }
})

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.get("/factz", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})


app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css")
})

app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/script.js")
})

app.get('/video', function(req, res) {
  const path = __dirname + '/videos/cokeVideo.mp4'
  const fileSize = fs.statSync(path).size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})
