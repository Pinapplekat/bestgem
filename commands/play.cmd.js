var name = "play"
var description = `Put in /play 5 to enter 5 coins with a chance to recieve more back or lose it!`

const msgs = require('/app/messages.js')

function main(messagedata){
  console.log('called the command', messagedata)
  return msgs.newMessage({token: 32893050508.25168, userId: 6, message: messagedata.username+", hi", room: messagedata.room})
  var amount = messagedata.message.split(' ')
  if(amount[1]){
    amount = Number(amount[1])
    if(!amount){
      return msgs.newMessage({token: 32893050508.25168, userId: 6, message: messagedata.username+", you need to enter a real number bruh", room: messagedata.room})
    }else if(amount <= 0) return msgs.newMessage({token: 32893050508.25168, userId: 6, message: messagedata.username+", you need to enter a positive number", room: messagedata.room})
    
  }else{
    return msgs.newMessage({token: 32893050508.25168, userId: 6, message: messagedata.username+", you need to enter an amount to play with!", room: messagedata.room})
  }
}

module.exports = {
  main,
  name,
  description
}