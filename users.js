const fs = require('fs')

function userExists(data){
  var users = fs.readFileSync(__dirname+"/users.json")
  users = Array.from(JSON.parse(users))
  var usernameExists = false
  users.forEach(user => {
    if(user.username.toLowerCase() == data.username.toLowerCase()){
      usernameExists = true
    }
  })
  if(usernameExists) return true
  else return false
}

function getUserById(id){
  var users = fs.readFileSync(__dirname+"/users.json")
  users = Array.from(JSON.parse(users))
  return users[id]
}

function enterRoom(token, room){
  if(!validateToken(token)) return
  var users = fs.readFileSync(__dirname+"/users.json")
  users = Array.from(JSON.parse(users))
  
  var id = getUserByToken(token).id
  users[id].room = room
  
  fs.writeFileSync(__dirname+"/users.json", JSON.stringify(users))
  return room
}

function newUser(username, password, room){
  var now = Date.now()
  var users = fs.readFileSync(__dirname+"/users.json")
  users = Array.from(JSON.parse(users))
  var id = users.length
  var token = generateToken(users)
  
  var user = {username, password, room, id, token, creation: now}
  users.push(user)
  fs.writeFileSync(__dirname+"/users.json", JSON.stringify(users))
  return user
}

function checkPassword(data){
  var users = fs.readFileSync(__dirname+"/users.json")
  users = Array.from(JSON.parse(users))
  var i = 0
  var index = false
  users.forEach(user => {
    if(user.username.toLowerCase() == data.username.toLowerCase()){
      index = i
    }
    else i++
  })
  if(index){
    if(users[index].password == data.password){
      return {status:{success: true}, token: users[index].token}
    }else return {status:{success: false, message: "Password incorrect"}}
  }else if(index == false) return {status:{success: false, message: "User not found"}}
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
  return exists
}

function getUserByToken(token){
  var users = fs.readFileSync(__dirname+"/users.json")
  users = Array.from(JSON.parse(users))
  var exists = false
  var i = 0;
  var k
  users.forEach(item => {
    if(item.token == token){
      exists = true
      k = i
    }
    i++
  })
  if(exists){
    return {status:{success: true}, user: users[k]}
  }else{
    return {status:{success: false, message: "User could not be found with token"}}
  }
}

module.exports = {
  newUser,
  validateToken,
  generateToken,
  userExists,
  getUserByToken,
  checkPassword,
  enterRoom,
  getUserById
}