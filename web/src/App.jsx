import { useEffect, useState } from 'react'

import './App.css'

import { Socket } from './modules/Socket'
import { Container } from './components/Container'

import { Chat } from './pages/Chat'
import { Register } from './pages/Register'

function App() {
  const [socketState, setSocketState] = useState(false)

  const [mensageValue, setMensageValue] = useState('')
  const [chatMensages, setChatMensages] = useState([])

  const [username, setUsername] = useState({
    valid: false
  })






  return (
    <Socket username={username}>

      <Container>


        {socketState ?
          <Chat />
          :
          <Register setSocketState={setSocketState} setUsername={setUsername} />

        }


      </Container>


    </Socket>
  )
}

export default App
