import Head from 'next/head'
import SocketIOClient from "socket.io-client";
import { useEffect, useState } from 'react'


import Chat from '../components/Chat'
import Username from '../components/Username'
let socket



const App = () => {

  const [username, setUsername] = useState('')

  useEffect(() => {
    socket = SocketIOClient.connect(process.env.BASE_URL, {
      path: "/api/socketio",
    });


    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
    });

  }, [])

  return (
    <>
      <Head>
        <title>Live Chat</title>
        <meta name="description" content="Simple live chat using to NextJs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>



      {!username ?

        <Username setUsername={setUsername} />
        :
        <Chat username={username} socket={socket} />
      }




    </>
  )
}

export default App
