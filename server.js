let port = 3000
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const { newUser, userExists, checkPassword, validateToken } = require('./src/users.js')
const { newMessage } = require('./src/messages.js')

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  socket.on('message', (data) => {
    var message = newMessage(data)
  });
});

app.get('/', (req,res) => {
  var { token } = req.query
  if(!token) return res.redirect('/login')
  if(validateToken(token)){
    res.sendFile(__dirname+'/index.html')
  }
  else return res.redirect('/login')
})

app.get('/logincheck', (req,res) => {
  var { username, password, room } = req.query
  if(userExists({username})){
    var login = checkPassword({username, password})
    if(login.status.success){
      res.redirect('/?token='+login.token)
    }else if(!login.status.success){
      res.send(login.status.message)
    }
  }else{
    var user = newUser(username, password, room)
    res.redirect('/?token='+user.token)
  }
})

app.get('/login', (req,res) => {
  res.sendFile(__dirname+'/login.html')
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

server.listen(port, (e) => {
  if(e) throw e
  console.log('Server listening on https://bestgem.glitch.me/')
})