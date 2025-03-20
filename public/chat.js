const form = document.getElementById("userinput")
const message = document.getElementById('message')
const socket = io();

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (message.value) {
    socket.emit('chat message', message.value);
    message.value = '';
  }
})