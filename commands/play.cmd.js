var name = "play"
var description = `Put in /play 5 to enter 5 coins with a chance to recieve more back or lose it!`

const msgs = require('/app/messages.js')
const fs = require('fs')

function main(messagedata){
  var amount = messagedata.message.split(' ')
  if(amount[1]){
    amount = Number(amount[1])
    if(!amount){
      return msgs.newMessage({token: 32893050508.25168, userId: 6, message: messagedata.username+", you need to enter a real number bruh", room: messagedata.room, username: "Game Pro"})
    }else if(amount <= 0) {
      return msgs.newMessage({token: 32893050508.25168, userId: 6, message: messagedata.username+", you need to enter a positive number", room: messagedata.room, username: "Game Pro"})
    }
    var currentUser
    if(!userExists(messagedata.userId)){
      var newUser = {
        cash: 100,
        plays: 0,
        userId: messagedata.userId
      }
      currentUser = newUser
    }
    
  }else{
    return msgs.newMessage({token: 32893050508.25168, userId: 6, message: messagedata.username+", you need to enter an amount to play with!", room: messagedata.room, username: "Game Pro"})
  }
}

function userExists(userId){
  var playUsers = fs.readFileSync(__dirname+"/play-users.json")
  playUsers = Array.from(playUsers)
  var exists = false
  playUsers.forEach(user => {
    if(user.id == userId){
      exists = true
    }
  })
  return exists
}

module.exports = {
  main,
  name,
  description,
  userExists
}