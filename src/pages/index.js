import Head from 'next/head'

import { useEffect, useState } from 'react'


import Chat from '../components/Chat'
import Username from '../components/GetUsername'
import { Container } from '../components/Container'

import { ListUsers } from '../components/ListUsers'


const App = () => {

  const [username, setUsername] = useState('')
  const [users, setUsers] = useState([])

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
          <>
            <ListUsers users={users} />
            <Chat username={username} />
          </>

          :
          <Username setUsername={setUsername} />
        }


      </Container>


    </>
  )
}

export default App
