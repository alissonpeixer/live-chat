

const users = []

const userDisconect = []

const removeUser = (socket) => {
  console.log(`- ${socket.id} LEFT`)

  users.map((item, id) => {
    if (item.socketId === socket.id) {
      users.splice(id)
    }
  })

  return {
    socketId: socket.id
  }
}

export default (io, socket) => {


  socket.on('sendMensage', data => {
    // console.log(data)
    socket.emit('sendStatusCheck')

    socket.broadcast.emit('recebMensage', {
      ...data,
      you: false,
      typing: false
    })
  })


  socket.on('userJoined', data => {


    // for user
    socket.emit('userLogin', users)


    users.push(data)



    // for all users connected
    socket.broadcast.emit('notifyUserJoined', {
      data
    })
  })

  socket.on('disconnect', () => {

    const user = removeUser(socket)

    console.log(user)

    socket.broadcast.emit('notifyUserLeft', user)

  })



  socket.on('typing', () => {
    socket.broadcast.emit('isTyping', socket.id)
  })


  socket.on('stopTyping', () => {
    socket.broadcast.emit('noTyping', socket.id)
  })



}
