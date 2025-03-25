var name = "balance"
var description = `Check your balance`

const msgs = require('/app/messages.js')
const fs = require('fs')
const play = require('./play.cmd.js')

function main(messagedata){
  if(play.userExists(messagedata.userId) == false){
    return msgs.newMessage({token: 32893050508.25168, userId: 6, message: messagedata.username+", you need to register with Game Pro by typing `/play 5`!", room: messagedata.room, username: "Game Pro"})
  }else{
    var players = play.getPlayers()
    var coins = 0
    players.forEach(player => {
      if(player.userId == messagedata.userId){
        coins = player.coins
      }
    })
  }
  return msgs.newMessage({token: 32893050508.25168, userId: 6, message: messagedata.username+", you have "+coins+" coins!", room: messagedata.room, username: "Game Pro"})
}

module.exports = {
  main,
  name,
  description
}