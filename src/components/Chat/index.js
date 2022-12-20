
import { ArrowRightIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from "react"


import { Container } from '../Container'
import { MenssageFriend } from "./MenssageFriend"
import { MenssageUser } from "./MenssageUser"

import socket from "../../../socket"


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
      socket.off('message')
    }
  }, [socket])


  const sendMenssage = async (e) => {
    if (!value) return

    setSendState(false)

    await audioSend.play()

    setMensages(prevOld => [...prevOld, {
      you: true,
      menssage: value,
      author: username,
      socketId: socket.id
    }])

    socket.emit('sendMensage', {
      menssage: value,
      author: username,
      socketId: socket.id
    })


    myRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    setValue('')

  }
  return (
    <>

      <div className='overflow-y-auto h-[80%] gap-3 flex flex-col bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl py-5'>
        {
          menssages?.map((data, index) => (
            !data.you ?
              <MenssageFriend data={data} key={index} />
              :
              <MenssageUser data={data} key={index} sendState={sendState} />
          ))
        }
        <div ref={myRef} className='my-60'>
        </div>


      </div>


      <div className='transition-all h-[20%] flex-1   bg-white/[0.3] flex flex-col lg:justify-center rounded-3xl'>

        <div className='flex items-center justify-end'>

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
      </div>

    </>
  )
}

export default Chat
