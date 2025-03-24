var command = "play"
var description = `Put in /play 5 to enter 5 coins with a chance to recieve more back or lose it!`

const msgs = require('../messages.js')

function main(messagedata){
  var amount = messagedata.message.split(' ')
  if(amount[1]){
    amount = amount[1]
  }else{
    return {
      
    }
  }
}

module.exports = {
  main,
  name,
  description
}