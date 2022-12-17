import io from 'socket.io-client'
let socket = io()


connect()
async function connect() {
  await fetch('/api/socket')
}

export default socket
