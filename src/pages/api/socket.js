import { App } from "uWebSockets.js";
import { Server } from "socket.io";

export default (req, res) => {
  const app = new App();
  const io = new Server(res.socket.server);


  res.socket.server.io = io
  io.attachApp(app);

  io.on("connection", (socket) => {
    console.log('+ CONNECTING')
    socket.on('input-change', (msg) => {
      io.emit('update-input', msg)
    })
  });



  res.end()

  res.status(201).json('salve');
}
