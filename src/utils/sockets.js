

const users = []


const removeUser = (socket) => {
  console.log(`- ${socket.id} LEFT`)
  let removeUser
  users.map((user, id) => {
    if (user.socketId === socket.id) {
      users.splice(id)
      removeUser = user
    }


  })


  return removeUser
}

export default (io, socket) => {


  socket.on('sendMensage', data => {
    // console.log(data)
    socket.emit('sendStatusCheck')

    socket.broadcast.emit('recebMensage', {
      ...data,
      you: false
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

  socket.on('disconnect', async data => {

    const user = await removeUser(socket)
    console.log(user)
    socket.broadcast.emit('notifyUserLeft', user)

  })



}
