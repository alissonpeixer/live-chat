import { Server } from "socket.io";
import sockets from "../../utils/sockets";



export default function socket(req, res) {


  if (res.socket.server.io) {
    console.log("+ ONLINE");
    return
  }

  const io = new Server(res.socket.server);

  res.socket.server.io = io;


  const socketOnline = (socket) => {
    sockets(io, socket)
  }

  io.on("connection", socketOnline);


  res.status(200).json('FOI')
  res.end();

}
