var name = "iframe"
var description = "Send messages anonymously."

const { newMessage } = require('../messages.js')

function main(data){
  var msg = data.message
  var [first, ...msgText] = msg.split(' ')
  msgText = msgText.join(' ')
  return newMessage({username: "Anonymous", userId: 7, token: 36032080796.73138, message: msgText, room: data.room})
}

module.exports = {
  name,
  description,
  main
}