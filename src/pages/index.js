import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
let socket

const Home = () => {
  const [input, setInput] = useState('')

  useEffect(() => {
    socketInitializer()
  }, [])

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })
  }



  return (
    <h1>SAVE</h1>
  )
}


export default Home;
