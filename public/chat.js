const form = document.getElementById("userinput")
const message = document.getElementById('message')
const socket = io();

form.addEventListener('submit', (e) => {
  e.preventDefault()
  document.body.innerHTML += message.value
})