import Head from 'next/head'
import { Inter } from '@next/font/google'
import socket from '../../socket'
import { useEffect, useState } from 'react'


import Chat from '../components/Chat'
import Username from '../components/Username'

const App = () => {

  const [username, setUsername] = useState('')




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
        <Chat username={username} />
      }




    </>
  )
}

export default App
