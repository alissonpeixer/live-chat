const users = []

const removeUser = (socketId) => {
  const idx = users.findIndex(u => u.socketId === socketId)
  const user = idx !== -1 ? users[idx] : null
  if (idx !== -1) users.splice(idx, 1)
  return user
}

const broadcastRooms = (io) => {
  const counts = {}
  users.forEach(u => { if (u.room) counts[u.room] = (counts[u.room] || 0) + 1 })
  io.emit("roomsList", counts)
}

const registerSocketHandlers = (io, socket) => {
  socket.on("getRooms", () => {
    const counts = {}
    users.forEach(u => { if (u.room) counts[u.room] = (counts[u.room] || 0) + 1 })
    socket.emit("roomsList", counts)
  })

  socket.on("joinRoom", (data) => {
    const existing = users.find(u => u.socketId === socket.id)
    if (existing) {
      if (existing.room) {
        socket.leave(existing.room)
        socket.to(existing.room).emit("notifyUserLeft", { socketId: socket.id })
      }
      existing.room = data.room
    } else {
      users.push({ username: data.username, socketId: socket.id, room: data.room })
    }

    socket.join(data.room)

    const roomUsers = users.filter(u => u.room === data.room && u.socketId !== socket.id)
    socket.emit("userLogin", roomUsers)
    socket.to(data.room).emit("notifyUserJoined", { data })
    broadcastRooms(io)
  })

  socket.on("sendMensage", (data) => {
    socket.emit("sendStatusCheck")
    socket.to(data.room).emit("recebMensage", { ...data, you: false })
  })

  socket.on("sendDM", (data) => {
    socket.emit("sendStatusCheck")
    io.to(data.targetSocketId).emit("recebDM", { ...data, you: false })
  })

  socket.on("disconnect", () => {
    const user = removeUser(socket.id)
    if (user?.room) io.to(user.room).emit("notifyUserLeft", { socketId: socket.id })
    socket.broadcast.emit("notifyUserOffline", { socketId: socket.id })
    broadcastRooms(io)
  })

  socket.on("typing", ({ username, room, targetSocketId }) => {
    if (room) socket.to(room).emit("isTyping", { socketId: socket.id, username })
    else if (targetSocketId) io.to(targetSocketId).emit("isDMTyping", { socketId: socket.id, username })
  })

  socket.on("stopTyping", ({ username, room, targetSocketId }) => {
    if (room) socket.to(room).emit("noTyping", { socketId: socket.id, username })
    else if (targetSocketId) io.to(targetSocketId).emit("noDMTyping", { socketId: socket.id, username })
  })
}

export default registerSocketHandlers
