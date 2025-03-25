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
    
    var playUsers = fs.readFileSync(__dirname+"/play-users.json")
    playUsers = Array.from(playUsers)
    
    var currentUser
    var index = -1
    var i = 0
    if(!userExists(messagedata.userId)){
      var newUser = {
        coins: 100,
        plays: 0,
        userId: messagedata.userId
      }
      currentUser = newUser
      playUsers.push(newUser)
    }
    playUsers.forEach(user => {
      if(user.userId == messagedata.userId){
        currentUser = user
        index = i
      }
      i++
    })
    console.log(index)
    if(index < 0) return msgs.newMessage({token: 32893050508.25168, userId: 6, message: messagedata.username+", there was an error retrieving your data!", room: messagedata.room, username: "Game Pro"})
    var won = Math.random() > 0.5
    var finalAmount
    var result
    if(won){
      playUsers[index].coins += amount
      finalAmount = amount*2
      result = "won +"
    }else{
      playUsers[index].coins -= amount
      finalAmount = -amount
      result = "lost -"
    }
    playUsers[index].cash++
    
    fs.writeFileSync(__dirname+"/play-users.json", JSON.stringify(playUsers))
    return msgs.newMessage({token: 32893050508.25168, userId: 6, message: messagedata.username+", you just "+result+finalAmount+" coins!", room: messagedata.room, username: "Game Pro"})
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

function getPlayers(){
  var playUsers = fs.readFileSync(__dirname+"/play-users.json")
  playUsers = Array.from(playUsers)
  return playUsers
}

module.exports = {
  main,
  name,
  description,
  userExists,
  getPlayers
}