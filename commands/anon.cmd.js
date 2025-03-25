var name = "anon"
var description = "Send messages anonymously."

const { newMessage } = require('../messages.js')

function main(data){
  var {a, ...message} = data.message.split(" ")
  // message = message.join(" ")
  var stringed = ""
  Array.from(message).forEach(word => {
    stringed+=word+" "
  })
  return newMessage({username: "Anonymous", userId: 7, token: 36032080796.73138, message: stringed, room: data.room})
}

module.exports = {
  name,
  description,
  main
}