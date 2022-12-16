import { useEffect } from 'react'
import socket from '../socket'


export const Socket = ({ children, username, setChatMensages, mensageValue, myRef, setSocketState }) => {

    const audio = new Audio('/not.mp3')
    console.log(username)
    useEffect(() => {

        if (username.valid) {
            socket.emit('join user', username)
        }

        socket.on('start state', data => {
            console.log(data)

            setChatMensages(data.mensageDataBase)
            myRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
        })


        socket.on('disconnect', data => {
            setSocketState(false)
        })


        return () => {
            socket.off('join user')
            socket.off('start state')

        }
    }, [socket, username])



    useEffect(() => {
        if (mensageValue.valid) {
            socket.emit('send menssage', mensageValue.msg)
        }

        socket.on('receb menssage', data => {
            console.log(data)
            audio.play()

        })

        return () => {
            socket.off('send menssage')
            socket.off('receb menssage')
        }
    }, [mensageValue])



    return (
        <section>
            {children}
        </section>
    )
}