var name = "gif"
var description = `Send a gif.`

const msgs = require('/app/messages.js')
const fs = require('fs')
const play = require('./play.cmd.js')
const rest = require('./rest.js')

async function main(messagedata){
  const KEY = "owAJki7QYorBwZCzfoyN2ggMoj3cqDOh";
  var msg = messagedata.message
  var [first, ...msgText] = msg.split(' ')
  msgText = msgText.join(' ')
  var URL =
  "/v1/gifs/search?q=" +
  msgText.split(' ').join("%20") +
  "&api_key=" +
  KEY +
  "&limit=" +
  1;
  const options = {
    host: 'api.giphy.com',
    // port: 443,
    path: URL,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  var result = await rest.getJSON(options, (statusCode, result) => {
    console.log(`onResult: (${statusCode})`);
    if(result['data'][0]) if(result['data'][0].images) if(result['data'][0].images.original)
    var link = result['data'][0].images.original.url
    if(!link) 
      link = 'https://cdn-icons-png.flaticon.com/512/13434/13434972.png'
    console.log(link)
  });
    return msgs.newMessage({token: messagedata.token, userId: messagedata.userId, message: "<img src="+result+">", room: messagedata.room, username: messagedata.username})
  // console.log(result)
}

module.exports = {
  main,
  name,
  description
}