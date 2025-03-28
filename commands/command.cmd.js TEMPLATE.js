var name = "command" // Command name
var description = "A very cool command" // Command description

const { newMessage } = require('/app/messages.js') // Imports the ability to send a message, you need this for the command to work

function main(data){
  
  // Code goes here
  
  var output = {
    token: data.token, // Passes the token of the user to send a message, to verify identity
    userId: data.userId, // Passes the user's ID so the messages API can use it
    message: "I just used a command!", // The actual message that will appear
    room: data.room, // The room of which to send the message to
    username: data.username // The username to display above the message
  }
  return newMessage(output) // Sends the actual message
}

module.exports = {
  name,
  description,
  main
}