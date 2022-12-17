import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
  const io = new Server(res.socket.server)
  res.socket.server.io = io

  io.on('connection', (socket) => {
    socket.on('input-change', (msg) => {
      io.emit('update-input', msg)
    })
  })

  console.log('Setting up socket')
  res.socket.end()
}

export default SocketHandler
