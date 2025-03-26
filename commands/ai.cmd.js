const msgs = require('/app/messages.js')
const fs = require('fs')
const request = require('sync-request');

var url = "https://api.openai.com/v1/chat/completions"
var headers = JSON.stringify({
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer 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`,
})
var name = "ai"
var description = "Ask AI questions."

function main(data){
  console.log(getAI("hi there"))
}

function getAI(query){
  var json = JSON.stringify({
    model: "gpt-4",
    prompt: query,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["\n"],
  })
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