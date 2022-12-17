import { NextApiRequest } from "next";

import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";


import sockets from "../../utils/sockets";


export default async (req, res) => {


  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer = res.socket.server;
    const io = new ServerIO(httpServer, {
      path: "/api/socketio",
    });
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;


    // const socketOnline = (socket) => {
    //   sockets(io, socket)
    // }

    // io.on("connection", socketOnline);

  }







  res.end();

}
