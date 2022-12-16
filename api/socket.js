import { io } from './server.js'


const mensageDataBase = []
const usersConnected = []
let usersAcountId = 0



export const socketIo = () => {

    io.on('connection', (socket) => {
        let idSecssion


        socket.on('join user', username => {
            idSecssion = ++usersAcountId


            usersConnected.push({
                username,
                socketId: socket.id,
                id: idSecssion
            })

            console.log(`+ ${socket.id} as connected`);

            io.emit('start state', usersConnected)

        })






        socket.on('disconnect', () => {
            console.log(`- ${socket.id} as disconnect`);

            --usersAcountId

            usersConnected.map(user => {
                if (user.socketId === socket.id) {
                    usersConnected.splice(user)

                    io.emit('user leave', {
                        msg: `${user.socketId} Acabou de sair.`
                    })
                    return
                }
            })




        });


        socket.on('send mensage', msg => {

            mensageDataBase.push({
                msg: msg,
                socketId: socket.id,
                id: idSecssion
            })


            io.emit('receb mensage', mensageDataBase)
        })





    });
}