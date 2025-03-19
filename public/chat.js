const form = document.body.getElementById("userinput")
const message = document.body.getElementById('message')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  document.body.innerText = message.value
})