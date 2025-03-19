let port = 3000

const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



app.get('/', (req,res) => {
  res.sendFile(__dirname+'/index.html')
})

app.get('/chat', (req,res) => {
  res.sendFile(__dirname+'/chat.html')
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