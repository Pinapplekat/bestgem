const fs = require('fs')
const { newMessage } = require('./messages.js')
// const path = require('./commands');
var commands = []

function getFileNames(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath);
    return files;
  } catch (err) {
    console.error("Error reading directory:", err);
    return [];
  }
}

function parseCommands(path){
  var files = getFileNames(path)
  var cmdfiles = []
  if(files.length > 0){
    files.forEach(file =>{
      if(file.endsWith('.cmd.js')){
        cmdfiles.push(file)
      }
    })
    commands = cmdfiles
    return cmdfiles
  }
}

function checkIfCommand(data){
  var isCommand = false
  if(!data.message.startsWith('/')) return false
  var command = data.message.split(' ')[0].split('/')[1]
  if(!command) return false
  commands.forEach(name => {
    if(require(__dirname+"/commands/"+name).name == command) isCommand = true
  })
  console.log(command+": "+isCommand)
  return {status: isCommand, command: command}
}

function emitCommand(data, command){
  var path
  commands.forEach(name => {
    if(require(__dirname+"/commands/"+name).name == command){
      path = name
    }
  })
  if(!path) return newMessage(data)
  const emitted = require(__dirname+"/commands/"+path)
  var worked = emitted.main(data)
  return worked
}

module.exports = {
  parseCommands,
  getFileNames,
  emitCommand,
  checkIfCommand
}