var name = "help"
var description = "Shows a list of all the commands"

const {newMessage} = require('/app/messages.js')
const {parseCommands} = require("/app/command-handler.js")
const fs = require('fs')

function main(data){
  var commands = parseCommands("/app/commands/")
  var message = `
  <table class="tg" style="undefined;table-layout: fixed; width: 340px"><colgroup>
<col style="width: 76px">
<col style="width: 264px">
</colgroup>
  <thead>
  <tr>
    <th class="tg-baqh">Name</th>
    <th class="tg-0lax">Description</th>
  </tr></thead>
<tbody>
  `
  var commandsData = []
  commands.forEach(command => {
    var toData = {
      name: "/"+require("/app/commands/"+command).name,
      description: require("/app/commands/"+command).description
    }
    commandsData.push(toData)
  })
  
  commandsData.forEach(command => {
    message+=`<tr>
                <td class="tg-0lax">${command.name}</td>
                <td class="tg-0lax">${command.description}</td>
              </tr>`
  })
  message+=`</tbody></table>`
  return newMessage({username: "Server", userId: 15, token: 36455667440.76759, message: message, room: data.room})
}

module.exports = {
  name,
  description,
  main
}