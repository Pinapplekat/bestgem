const { validateToken } = require('./users.js')
const fs = require('fs')

function newMessage(data){
  var now = new Date()
  if(validateToken(data.token)){
    var messages = fs.readFileSync(__dirname+"/messages.json")
    messages = Array.from(JSON.parse(messages))
    var id = messages.length
    console.log(data.username+" said '"+data.message+"'")
    var message = {username: data.username, timestamp: now, message: data.message, id}
    messages.push(message)
    fs.writeFileSync(__dirname+"/messages.json", JSON.stringify(messages))
    return message
  }
}

module.exports = {
  newMessage
}