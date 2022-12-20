import Head from 'next/head'

import { useEffect, useState } from 'react'


import Chat from '../components/Chat'
import Username from '../components/GetUsername'
import { Container } from '../components/Container'



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



      <Container>

        {username ?
          <Chat username={username} />
          :
          <Username setUsername={setUsername} />
        }


      </Container>


    </>
  )
}

export default App
