let port = 3000

const express = require('express')
var app = express()

app.get('/', (req,res) => {
  res.sendFile(__dirname+'/src/pages/index.html')
})

app.get('/style.css', (req,res) => {
  res.sendFile(__dirname+'/public/style.css')
})

app.listen(port, (e) => {
  if(e) throw e
  console.log('Server listening on https://bestgem.glitch.me:'+port)
})