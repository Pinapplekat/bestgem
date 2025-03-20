const fs = require('fs')

function newUser(username, password, room){
  var users = fs.readFileSync(__dirname+"/users.json")
  users = Array.from(JSON.parse(users))
  var id = users.length
  var token = generateToken(users)
  
  var user = {username, password, room, id, token}
  return user
}

function generateToken(array){
  var token = Math.random()*36574863463
  var exists = false
  array.forEach(item => {
    if(item.token == token){
      exists = true
      generateToken(array)
    }
  })
  if(!exists){
    return token
  }
}

module.exports = {
  newUser
}