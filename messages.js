const { validateToken } = require('./users.js')
const fs = require('fs')

function newMessage(data){
  var now = Date.now()
  if(validateToken(data.token)){
    console.log("valud token")
    var messages = fs.readFileSync(__dirname+"/messages.json")
    messages = Array.from(JSON.parse(messages))
    var id = messages.length
    var message = {status:{success: true}, username: data.username, timestamp: now, message: data.message, id, room: data.room, userId: data.userId}
    messages.push(message)
    fs.writeFileSync(__dirname+"/messages.json", JSON.stringify(messages))
    return message
  }else{
    return {status: {success: false,message: "User token not verified"}, username: data.username, timestamp: now, message: data.message, room: data.room}
  }
}

function getMessageById(id){
  var messages = fs.readFileSync(__dirname+"/messages.json")
  messages = Array.from(JSON.parse(messages))
  return messages[id]
}

module.exports = {
  newMessage,
  getMessageById
}