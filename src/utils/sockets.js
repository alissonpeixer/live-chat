const users = []

export default (io, socket) => {
  console.log('LISTA DE USERS')
  console.log(users)

  socket.on('sendMensage', data => {
    // console.log(data)
    socket.emit('sendStatusCheck')
    socket.broadcast.emit('recebMensage', {
      ...data,
      you: false
    })
  })


  socket.on('userJoined', data => {
    users.push(data)

    // for user
    socket.emit('userLogin', users)

    // for all users connected
    socket.broadcast.emit('notifyUserJoined', {
      data
    })
  })

  socket.on('disconnect', data => {
    // console.log(socket)

    users.map((user, id) => {
      if (user.socketId === socket.id) {
        users.splice(id)
        socket.broadcast.emit('notifyUserLeft', user)
      }


    })


  })



}
