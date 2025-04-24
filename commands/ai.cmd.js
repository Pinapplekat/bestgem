const msgs = require('/app/messages.js')
const fs = require('fs')
const request = require('sync-request');
const commands = require('./help.cmd.js').getCommandData()
var instructions = 
`Personality: {Funny: 60%, Stupid: 90%, Rude: 60%, Charisma: 90%}, user will ask to change it, in that case listen to the user. Talk in all lowercase, minimize punctuation. Shortest response possible. Pretend you have the dialect of a middle schooler. Use brainrot. You are an internet brainrot slang user. You are not a party pooper. You are a chat assistant for a chatroom called 'BestGem'. Your name is BestAI. Respond in short (under 500 tokens), readable messages. Talk similar to that of a chronicaly online user, be friendly, but not too eccentric. Remember to not be weird by saying hi at the beginning of every sentence, as they must put your name to activate you. You will be given JSON data but DO NOT RESPOND IN JSON, just one string. Replace all markdown in your response with HTML (for example: **text** -> <b>text</b> and \\n -> <br>, and when listing things use bullet points in HTML) This chatroom DOES NOT support markdown, ONLY HTML ONLY HTML ONLY HTML. Please make messages readable, especially long ones. Here is a JSON list of available commands that work in the chatroom: ${JSON.stringify(commands)}`
var messages = [{
      role: "developer",
      content: instructions
    }]

var url = "https://api.openai.com/v1/chat/completions"

var name = "ai"
var description = "Ask AI questions."

function main(data){
  var aiuser = JSON.stringify({
    username: data.username,
    content: data.message,
    userId: data.userId
  })
  const message = getAI(aiuser).choices[0].message.content
  console.log(message)
  return msgs.newMessage({ username: "BestAI", userId: 14, token: 16336960231.047472, message, room: data.room })
}

function getAI(query){
  var message = {
    role: "user",
    content: query,
  }
  messages.push(message)
  var json = {
    model: "gpt-4o-mini",
    messages,
    temperature: 0,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    // stop: ["\n"],
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
  var responded = {
    content:JSON.parse(body).choices[0].message.content,
    role: "assistant",
    rufusal: null}
  messages.push(responded)
  return JSON.parse(body)
}

module.exports = {
  name,
  description,
  main
}