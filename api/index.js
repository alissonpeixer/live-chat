import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

import * as dotenv from 'dotenv'
dotenv.config()

import { socketIo } from './socket.js'

const app = express();
const server = http.createServer(app);



const mensageDataBase = []
const usersConnected = []
let usersAcountId = 0




export const io = new Server(server, {
    cors: {
        origin: [`${process.env.WEB_URL}`],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});


io.on('connection', (socket) => {
    let idSecssion


    socket.on('join user', username => {
        idSecssion = ++usersAcountId
        socket.username = username

        usersConnected.push({
            username,
            socketId: socket.id,
            id: idSecssion
        })

        mensageDataBase.push({
            username,
            msg: 'Acabou de entrar no chat!'
        })


        console.log(`+ ${socket.id} as connected`);

        io.emit('start state', {
            mensageDataBase,
            usersConnected
        })

    })






    socket.on('disconnect', () => {
        console.log(`- ${socket.id} as disconnect`);

        --usersAcountId

        usersConnected.map(user => {
            console.log(user)
            if (user.socketId === socket.id) {
                usersConnected.splice(user)


                mensageDataBase.push({
                    msg: `Acabou de sair.`,
                    username: {
                        usernameValue: user.username.usernameValue
                    }
                })


                io.emit('start state', {
                    mensageDataBase,
                    usersConnected
                })

                return
            }
        })




    });


    socket.on('send menssage', msg => {

        console.log(msg)
        mensageDataBase.push({
            msg: msg,
            socketId: socket.id,
            id: idSecssion,
            username: {
                usernameValue: socket.username.usernameValue
            }

        })


        io.emit('start state', {
            mensageDataBase,
            usersConnected
        })

        socket.broadcast.emit('receb menssage', 'salve')
    })





});


server.listen(process.env.API_PORT, () => {
    console.log('+ API ONLINE');
});