
import { ArrowRightIcon, DocumentPlusIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from "react"


import { Container } from '../Container'
import { MenssageFriend } from "./MenssageFriend"
import { MenssageUser } from "./MenssageUser"




const Chat = ({ username, socket, setUsername }) => {

  const [sendState, setSendState] = useState(false)

  const audioSend = new Audio('/send.mp3')
  const audioNoty = new Audio('/receb.mp3')

  const [menssages, setMensages] = useState([])
  const [value, setValue] = useState('')

  const date = new Date().toLocaleString()

  const myRef = useRef(null)


  // console.log(date.split(' ')[1])




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
      socket.off('isTyping')
    }
  }, [socket])

  const isTyping = () => {
    socket.emit('typing')
  }

  const noTyping = () => {
    socket.emit('stopTyping')
  }

  const sendMenssage = async (e) => {
    if (!value) return

    setSendState(false)
    noTyping()

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
    <main className='transition-all h-full xl:w-3/4 w-full bg-cover  bg-white bg-opacity-10 backdrop-blur-xl rounded-lg'>

      <div className='overflow-y-auto h-[80%] gap-3 flex flex-col  rounded-3xl p-5 scrollbar scrollbar-thumb-emerald-400  scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-track-rounded-md'>
        <div className='my-10 block xl:hidden'></div>
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


      <div className='transition-all h-[20%] flex-1 flex flex-col lg:justify-center rounded-3xl'>

        <div className='flex items-center justify-end'>

          <div className='absolute  pr-10 flex gap-4 '>
            <button
              onClick={() => sendMenssage()}
              className='transition-all rounded-full z-10 items-center justify-center flex  bg-emerald-400/[0.4] p-2 hover:bg-emerald-400 '>
              <ArrowRightIcon className='w-6 h-6  transition-all 0 shadow-2xl' />
            </button>
            {/* <button
              onClick={() => sendMenssage()}
              disabled={true}
              className='transition-all rounded-full z-10 items-center justify-center flex  bg-emerald-400/[0.4] p-2 '>
              <DocumentPlusIcon className='w-6 h-6  transition-all 0 shadow-2xl' />
            </button> */}
          </div>

          <input
            onChange={e => {
              setValue(e.target.value)
            }}

            onBlurCapture={() => noTyping()}
            // onFocusCapture={() => }
            onKeyDown={e => {
              isTyping()
              e.code === 'Enter' && sendMenssage()
            }}
            value={value}
            type="text"

            className='border overflow-hidden  shadow-xl w-full  max-h-28 m-6  py-5 pl-6 pr-32 rounded-3xl focus:outline-none' />
        </div>
      </div>

    </main>
  )
}

export default Chat
