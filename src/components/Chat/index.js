import { Container } from '../Containers/Container'
import { ArrowRightIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from "react"

import { MenssageFriend } from "./MenssageFriend"
import { MenssageUser } from "./MenssageUser"

import socket from '../../../socket'

const Chat = ({ username }) => {
  const [sendState, setSendState] = useState(false)

  const audioSend = new Audio('/send.mp3')
  const audioNoty = new Audio('/receb.mp3')

  const [menssages, setMensages] = useState([])
  const [value, setValue] = useState('')

  const myRef = useRef(null)

  useEffect(() => {
    socket.on('sendStatusCheck', (data) => {
      setSendState(true)
    })
    socket.on('recebMensage', (data) => {

      setMensages(prevOld => [...prevOld, {
        you: true,
        ...data
      }])
      audioNoty.play()
      myRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    })

    return () => {
      socket.off('recebMensage')
      socket.off('sendStatusCheck')

    }
  }, [socket])


  const sendMenssage = async (e) => {
    if (!value) return
    setSendState(false)
    await audioSend.play()
    await setMensages(prevOld => [...prevOld, {
      you: true,
      menssage: value,
      author: username,
      socketId: socket.id
    }])

    await socket.emit('sendMensage', {
      menssage: value,
      author: username,
      socketId: socket.id
    })


    myRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    setValue('')

  }
  return (
    <Container>

      <div className='bg-zinc-600 flex-1 p-1 lg:p-4 flex flex-col gap-4 min-h-[80vh] overflow-y-auto'>


        {
          menssages?.map((data, index) => (
            !data.you ?
              <MenssageFriend data={data} key={index} />
              :
              <MenssageUser data={data} key={index} sendState={sendState} />
          ))
        }
        <div ref={myRef} className='mt-20 h-72 bg-zinc-600'></div>
      </div>



      <div className='w-full flex items-center justify-end z-30 fixed top-[80%] lg:top-[90%] drop-shadow-2xl  bg-white bg-opacity-20 backdrop-blur-lg'>
        <div className='absolute  pr-10 '>
          <button
            onClick={() => sendMenssage()}
            className='transition-all rounded-full z-10 items-center justify-center flex  bg-slate-400 p-2 hover:bg-zinc-700 '>
            <ArrowRightIcon className='w-6 h-6  transition-all 0 shadow-2xl   hover:stroke-slate-400' />
          </button>
        </div>
        <input
          onChange={e => {
            setValue(e.target.value)
          }}
          onKeyDown={e => e.code === 'Enter' && sendMenssage()}
          value={value}
          type="text"
          className='bg-zinc-100 border overflow-hidden  border-zinc-300  shadow-xl  max-h-28 m-6 w-11/12 py-5 pl-6 pr-14 rounded-3xl focus:outline-none' />
      </div>




    </Container>
  )
}

export default Chat
