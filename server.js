let port = 3000

const { createServer } = require('node:http')
const server = createServer(app)
const socketio = require("socket.io");
const io = new socketio.Server(server)
const express = require('express')
var app = express()


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



app.get('/', (req,res) => {
  res.sendFile(__dirname+'/src/pages/index.html')
})

app.get('/chat', (req,res) => {
  res.sendFile(__dirname+'/src/pages/chat.html')
})

app.get('/style.css', (req,res) => {
  res.sendFile(__dirname+'/public/style.css')
})

app.get('/chat.css', (req,res) => {
  res.sendFile(__dirname+'/public/chat.css')
})

app.get('/chat.js', (req,res) => {
  res.sendFile(__dirname+'/public/chat.js')
})

app.listen(port, (e) => {
  if(e) throw e
  console.log('Server listening on https://bestgem.glitch.me/')
})