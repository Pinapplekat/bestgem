const fs = require('fs')

function userExists(data){
  var users = fs.readFileSync(__dirname+"/users.json")
  users = Array.from(JSON.parse(users))
}

function newUser(username, password, room){
  var users = fs.readFileSync(__dirname+"/users.json")
  users = Array.from(JSON.parse(users))
  var id = users.length
  var token = generateToken(users)
  
  var user = {username, password, room, id, token}
  users.push(user)
  fs.writeFileSync(__dirname+"/users.json", JSON.stringify(users))
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

function validateToken(token){
  var users = fs.readFileSync(__dirname+"/users.json")
  users = Array.from(JSON.parse(users))
  var exists = false
  users.forEach(item => {
    if(item.token == token){
      exists = true
    }
  })
  if(exists){
    return true
  }else{
    return false
  }
}

module.exports = {
  newUser,
  validateToken,
  generateToken
}