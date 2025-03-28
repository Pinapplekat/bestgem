let port = 3000
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const { newUser, userExists, checkPassword, validateToken, getUserByToken, enterRoom, changeSocket, getUserBySocket } = require('./users.js')
const { newMessage } = require('./messages.js')
const { parseCommands, emitCommand, checkIfCommand } = require('./command-handler.js')

const app = express();
const server = createServer(app);
const io = new Server(server);
var online = []

var commands = parseCommands(__dirname+"/commands/")

io.on('connection', (socket) => {
  socket.on('requestroomlist', (data) => {
    var inRoom = []
    online.forEach(user => {
      if(user.room == data.room) inRoom.push({user})
    })
    var user = getUserByToken(data.token).user
    io.to(user.room).emit('usersInRoom', inRoom)
  })
  socket.on('message', (data) => {
    var userdata = getUserByToken(data.token).user
    socket.join(userdata.room)
    changeSocket(userdata.token, socket.id)
    if(data.message.toLowerCase().includes("bestai")){
      var message = newMessage({token: data.token, username: userdata.username, message: data.message, room: userdata.room, userId: userdata.id})
      io.to(userdata.room).emit('message', message)
      var commandData = emitCommand({token: data.token, username: userdata.username, message: data.message, room: userdata.room, userId: userdata.id}, checkIfCommand({message: "/ai"}).command)
      if(!commandData.status){
        return io.to(userdata.room).emit('message', {status:{success: false, message:"Unknown error"},message:message.message, userId: "Server"})
      }
      if(commandData.status.success){
        commandData.command = {name: "ai", executor: userdata.username}
        return io.to(userdata.room).emit('message', commandData)
      }else if(!commandData.status.success){
        return io.to(userdata.room).emit('message', {status:{success: false, message:message.status.message+message.room},message:message.message, userId: "Server"})
      }
      return
    }
    if(checkIfCommand(data).status){
      var commandData = emitCommand({token: data.token, username: userdata.username, message: data.message, room: userdata.room, userId: userdata.id}, checkIfCommand(data).command)
      if(!commandData.status.success) return io.to(userdata.room).emit('message', {status:{success: false, message:message.status.message+message.room},message:message.message, userId: "Server"})
      commandData.command = {name: checkIfCommand(data).command, executor: userdata.username}
      return io.to(commandData.room).emit('message', commandData)
    }
    var message = newMessage({token: data.token, username: userdata.username, message: data.message, room: userdata.room, userId: userdata.id})
    if(!message.status.success) return io.to(userdata.room).emit('message', {status:{success: false, message:message.status.message+message.room},message:message.message, userId: "Server"});
    if(message.status.success) io.to(userdata.room).emit('message', message);
  });
  socket.on('disconnect', () => {
    const currentdata = getUserBySocket(socket.id)
    var i = 0
    if(currentdata.status)if(!currentdata.status.success) return console.log(currentdata.status.message)
    var index = online.findIndex((onlineuser) => onlineuser.id === currentdata.user.id);
    if (index !== -1) {
      delete online[index]
    }else{
    }
    io.to(currentdata.user.room).emit('userLeft', {username: currentdata.user.username, id: currentdata.user.id})
  })
});

app.get('/', (req,res) => {
  var { token, room } = req.query
  if(!token) return res.redirect('/login')
  if(validateToken(token)){
    res.sendFile(__dirname+'/index.html')
    enterRoom(token, room)
    var userdata = getUserByToken(token).user
    io.to(getUserByToken(token).user.room).emit('join', getUserByToken(token));
    online.push({room: userdata.room, username: userdata.username, id: userdata.id, socket: userdata.socket})
  }
  else return res.redirect('/login')
})

app.get('/logincheck', (req,res) => {
  var { username, password, room } = req.query
  if(userExists({username})){
    var login = checkPassword({username, password})
    if(login.status.success){
      res.redirect('/?token='+login.token+'&room='+room)
    }else if(!login.status.success){
      res.send(login.status.message)
    }
  }else{
    var user = newUser(username, password, room)
    res.redirect('/?token='+user.token+'&room='+room)
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

app.get('/messages.json', (req,res) => {
  res.sendFile(__dirname+'/messages.json')
})

app.get('/users.json', (req,res) => {
  res.sendFile(__dirname+'/users.json')
})

server.listen(port, (e) => {
  if(e) throw e
  console.log('Server listening on https://bestgem.glitch.me/')
})