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
  if(files.length > 0){
    files.forEach(file =>{
      console.log(file)
    })
  }
}

module.exports = {
  parseCommands,
  getFileNames
}