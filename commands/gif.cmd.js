var name = "gif"
var description = `Send a gif.`

const msgs = require('/app/messages.js')
const fs = require('fs')
const play = require('./play.cmd.js')
const rest = require('./rest.js')
const request = require('sync-request');

function main(messagedata){
  var msg = messagedata.message
  var [first, ...msgText] = msg.split(' ')
  msgText = msgText.join(' ')
  var body = getGifs(msgText, 1)
  if(body['data'][0]) if(body['data'][0].images) if(body['data'][0].images.original)
  var link = body['data'][0].images.original.url
  if(!link) 
    link = 'https://cdn-icons-png.flaticon.com/512/13434/13434972.png'
  console.log(link)
  return msgs.newMessage({token: messagedata.token, userId: messagedata.userId, message: "<img src="+link+">", room: messagedata.room, username: messagedata.username})
}

function getGifs(search, limit){
  const KEY = "owAJki7QYorBwZCzfoyN2ggMoj3cqDOh";
  
  var URL =
  "/v1/gifs/search?q=" +
  search.split(' ').join("%20") +
  "&api_key=" +
  KEY +
  "&limit=" +
  limit;
  
  const response = request('GET', 'https://api.giphy.com'+URL);
  var body = response.getBody('utf8')
  return JSON.parse(body)
}

module.exports = {
  main,
  name,
  description
}