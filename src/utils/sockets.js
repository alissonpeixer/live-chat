const users = [];

const removeUser = (socket) => {
  const idx = users.findIndex(item => item.socketId === socket.id);
  if (idx !== -1) {
    users.splice(idx, 1);
  }
  return { socketId: socket.id };
};

export default (io, socket) => {
  socket.on("sendMensage", (data) => {
    socket.emit("sendStatusCheck");
    socket.broadcast.emit("recebMensage", {
      ...data,
      you: false,
    });
  });

  socket.on("userJoined", (data) => {
    socket.emit("userLogin", users);
    users.push(data);
    socket.broadcast.emit("notifyUserJoined", { data });
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket);
    socket.broadcast.emit("notifyUserLeft", user);
  });

  socket.on("typing", ({ username }) => {
    socket.broadcast.emit("isTyping", { socketId: socket.id, username });
  });

  socket.on("stopTyping", ({ username }) => {
    socket.broadcast.emit("noTyping", { socketId: socket.id, username });
  });
};
