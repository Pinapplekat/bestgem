const fs = require('fs')
// const path = require('./commands');

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
    return cmdfiles
  }
}

function checkIfCommand(data){
  
}

function emitCommand(data){
  
}

module.exports = {
  parseCommands,
  getFileNames,
  emitCommand,
  checkIfCommand
}