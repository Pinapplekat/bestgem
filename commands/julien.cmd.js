var name = "julien"
var description = `Average Julien sentence.`

const msgs = require('/app/messages.js')
const fs = require('fs')
const play = require('./play.cmd.js')

function main(messagedata){
  var brainrot = 'rizz sigma skibidi toilet munt edging edge alpha beta gyatt ohio mogging mew mewing fein fein fein fein fein fein mog daddy mommy cum cumming i_am_the_rizzler'
  brainrot = brainrot.split(' ')
  var wordCount = Math.floor(Math.random() * 15)
  var sentence = []
  for(let i=0; i<wordCount; i++){
    var word = Math.floor(Math.random() * brainrot.length)
    sentence.push(brainrot[word].split('_').join(' '))
  }
  sentence = sentence.join(' ')
  return msgs.newMessage({token: 32893050508.25168, userId: 6, message: sentence, room: messagedata.room, username: "Julien"})
}

module.exports = {
  main,
  name,
  description
}