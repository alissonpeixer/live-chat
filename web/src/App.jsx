import { useEffect, useRef, useState } from 'react'

import './App.css'

import { Socket } from './modules/Socket'
import { Container } from './components/Container'

import { Chat } from './pages/Chat'
import { Register } from './pages/Register'

function App() {
  const [socketState, setSocketState] = useState(false)

  const [mensageValue, setMensageValue] = useState({
    valid: false
  })

  const [chatMensages, setChatMensages] = useState([])

  const [username, setUsername] = useState({
    valid: false
  })


  const myRef = useRef(null);


  console.log(myRef)

  return (
    <Socket username={username} setChatMensages={setChatMensages} mensageValue={mensageValue} myRef={myRef} setSocketState={setSocketState}>

      <Container>


        {socketState ?
          <Chat chatMensages={chatMensages} setMensageValue={setMensageValue} myRef={myRef} />
          :
          <Register setSocketState={setSocketState} setUsername={setUsername} />

        }


      </Container>


    </Socket>
  )
}

export default App
