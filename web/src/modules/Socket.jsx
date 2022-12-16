import { useEffect } from 'react'
import socket from '../socket'


export const Socket = ({ children, username }) => {


    console.log(username)
    useEffect(() => {
        if (username.valid) {
            socket.emit('join user', username)
        }

        socket.on('start state', data => {
            console.log(data)
        })


        return () => {
            socket.off('join user')
            socket.off('start state')
        }
    }, [username, socket])


    return (
        <section>
            {children}
        </section>
    )
}