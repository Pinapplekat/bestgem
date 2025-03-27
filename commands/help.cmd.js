var name = "help"
var description = "Shows a list of all the commands"

const {newMessage} = require('/app/messages.js')
const {parseCommands} = require("/app/command-handler.js")
const fs = require('fs')

function main(data){
  var message = `
  <thead>
  <tr>
    <th class="tg-baqh">Name</th>
    <th class="tg-0lax">Description</th>
  </tr></thead>
<tbody>
  `
  
  return newMessage({username: "julien", userId: 4, token: 19021981761.676968, message: message, room: data.room})
}

module.exports = {
  name,
  description,
  main
}