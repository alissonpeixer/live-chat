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