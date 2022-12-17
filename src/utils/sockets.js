export default (io, socket) => {
  socket.on('sendMensage', data => {
    console.log(data)
    socket.emit('sendStatusCheck')
    socket.broadcast.emit('recebMensage', {
      ...data,
      you: false
    })
  })
}
