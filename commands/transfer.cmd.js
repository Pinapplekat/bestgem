var name = "transfer"
var description = "Transfer money between you and other people!"

const fs = require('fs')

function main(data){
  const admins = JSON.parse(fs.readFileSync("/app/admin-list.json"))
}