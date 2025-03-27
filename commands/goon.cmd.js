var name = "goon" // Command name
var description = "A cool command" // Command description

const { newMessage } = require('../messages.js')

function main(data){
  //code goes here sigma rizz gyat rizz gooning sigma gooning 
  var message = "nnuc riz gyat pay gorn TRALALAEO TRALALA"
  
  return newMessage({username: "julien", userId: 4, token: 19021981761.676968, message: message, room: data.room})
}

module.exports = {
  name,
  description,
  main
}