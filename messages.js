const { validateToken } = require('./users.js')
const fs = require('fs')

function newMessage(data){
  var now = Date.now()
  if(validateToken(data.token)){
    var messages = fs.readFileSync(__dirname+"/messages.json")
    messages = Array.from(JSON.parse(messages))
    var id = messages.length
    console.log(data.username+" said '"+data.message+"'")
    var message = {status:{success: true}, username: data.username, timestamp: now, message: data.message, id, room: data.room}
    messages.push(message)
    fs.writeFileSync(__dirname+"/messages.json", JSON.stringify(messages))
    return message
  }else{
    return {status: {success: false,message: "User token not verified"}, username: data.username, timestamp: now, message: data.message, room: data.room}
  }
}

module.exports = {
  newMessage
}