import SocketIOClient from "socket.io-client";
import { io } from "socket.io-client";



export const socket = io("/api/socketio")
