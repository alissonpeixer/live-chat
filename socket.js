import io from 'socket.io-client'

let socket

if (typeof window !== 'undefined') {
  const connect = async () => {
    await fetch('/api/socket')
  }
  connect()
  socket = io()
}

export default socket
