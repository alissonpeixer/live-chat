import { useEffect } from 'react'
import socket from '../socket'


export const Socket = ({ children, username, setChatMensages }) => {


    console.log(username)
    useEffect(() => {

        if (username.valid) {
            socket.emit('join user', username)
        }

        socket.on('start state', data => {
            console.log(data)

            setChatMensages(data.mensageDataBase)
        })



        return () => {
            socket.off('join user')
            socket.off('start state')
        }
    }, [socket, username])


    return (
        <section>
            {children}
        </section>
    )
}