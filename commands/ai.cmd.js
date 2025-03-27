const msgs = require('/app/messages.js')
const fs = require('fs')
const request = require('sync-request');

var url = "https://api.openai.com/v1/chat/completions"

var name = "ai"
var description = "Ask AI questions."

function main(data){
  var msg = data.message
  var {a, ...msgContent} = msg.split(' ')
  msgContent = msgContent.join(' ')
  const message = getAI(msgContent).choices[0].message.content
  return msgs.newMessage({ username: "BestAI", userId: 14, token: 16336960231.047472, message, room: data.room })
}

function getAI(query){
  var json = {
    model: "gpt-4",
    messages: [{
      role: "user",
      content: query
    }],
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["\n"],
  }
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer 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`,
  }
  var options = {
    json,
    headers
  }
  const response = request('POST', url, options);
  var body = response.getBody('utf8')
  return JSON.parse(body)
}

module.exports = {
  name,
  description,
  main
}