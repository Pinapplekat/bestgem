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
  var jsfiles = []
  if(files.length > 0){
    files.forEach(file =>{
      if(file.endsWith('.cmd.js')){
        console.log(file)
        jsfiles.push(file)
      }
    })
  }
}

module.exports = {
  parseCommands,
  getFileNames
}