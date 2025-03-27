var name = "transfer"
var description = "Transfer money straight into your account (MUST BE ON ADMIN LIST)"

const fs = require('fs')
const messages = require("/app/messages.js")
const play = require("./play.cmd.js")

function main(data){
  const admins = JSON.parse(fs.readFileSync("/app/admin-list.json"))
  if(!admins.includes(data.userId)){
    return messages.newMessage(data)
  }else{
    var amount = data.message.split(' ')
    if(amount[1]){
      amount = Number(amount[1])
      if(!amount){
        return messages.newMessage({token: 32893050508.25168, userId: 6, message: data.username+", you need to enter a real number bruh", room: data.room, username: "Game Pro"})
      }else if(amount <= 0) {
        return messages.newMessage({token: 32893050508.25168, userId: 6, message: data.username+", you need to enter a positive number", room: data.room, username: "Game Pro"})
      }
      
      if(play.userExists(data.userId)){
        var playUsers = fs.readFileSync(__dirname+"/play-users.json")
        playUsers = Array.from(JSON.parse(playUsers))
        var i = 0
        var index = -1
        playUsers.forEach(user => {
        if(user.userId == data.userId){
          index = i
        }
          i++
        })
        if(index < 0) return messages.newMessage({token: 32893050508.25168, userId: 6, message: data.username+", there was an error retrieving your data!", room: data.room, username: "Game Pro"})
        playUsers[index].coins += amount
        fs.writeFileSync(__dirname+"/play-users.json", JSON.stringify(playUsers))
        return messages.newMessage({token: 32893050508.25168, userId: 6, message: data.username+", you have been granted "+amount+" coins!", room: data.room, username: "Game Pro"})
      }
    }
  }
}

module.exports = {
  name,
  description,
  main
}