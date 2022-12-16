import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

import * as dotenv from 'dotenv'
dotenv.config()

import { socketIo } from './socket.js'

const app = express();
const server = http.createServer(app);



export const io = new Server(server, {
    cors: {
        origin: [`${process.env.WEB_URL}`],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

socketIo()


server.listen(process.env.API_PORT, () => {
    console.log('+ API ONLINE');
});