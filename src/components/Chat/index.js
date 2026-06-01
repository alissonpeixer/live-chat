import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from "react"

import { MenssageFriend } from "./MenssageFriend"
import { MenssageUser } from "./MenssageUser"

const MAX_CHARS = 500

const Chat = ({ username, socket }) => {
  const audioSendRef = useRef(null)
  const audioNotyRef = useRef(null)
  const bottomRef = useRef(null)

  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  const [typingUsers, setTypingUsers] = useState([])

  useEffect(() => {
    audioSendRef.current = new Audio('/send.mp3')
    audioNotyRef.current = new Audio('/receb.mp3')
  }, [])

  useEffect(() => {
    socket.on('sendStatusCheck', () => {
      setMessages(prev => {
        let lastIdx = -1
        for (let i = prev.length - 1; i >= 0; i--) {
          if (prev[i].you === true && !prev[i].sent) {
            lastIdx = i
            break
          }
        }
        if (lastIdx === -1) return prev
        return prev.map((msg, i) => i === lastIdx ? { ...msg, sent: true } : msg)
      })
    })

    socket.on('recebMensage', (data) => {
      setMessages(prev => [...prev, data])
      audioNotyRef.current?.play()
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    })

    socket.on('isTyping', (data) => {
      const typingUser = data?.username
      if (!typingUser) return
      setTypingUsers(prev => prev.includes(typingUser) ? prev : [...prev, typingUser])
    })

    socket.on('noTyping', (data) => {
      const typingUser = data?.username
      if (!typingUser) return
      setTypingUsers(prev => prev.filter(u => u !== typingUser))
    })

    return () => {
      socket.off('recebMensage')
      socket.off('sendStatusCheck')
      socket.off('isTyping')
      socket.off('noTyping')
    }
  }, [socket])

  const sendMessage = async () => {
    if (!value.trim()) return

    socket.emit('stopTyping', { username })

    const timestamp = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })

    setMessages(prev => [...prev, {
      you: true,
      sent: false,
      menssage: value,
      author: username,
      socketId: socket.id,
      timestamp,
    }])

    socket.emit('sendMensage', {
      menssage: value,
      author: username,
      socketId: socket.id,
      timestamp,
    })

    audioSendRef.current?.play()
    setValue('')
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }

  const typingLabel =
    typingUsers.length === 1
      ? `${typingUsers[0]} está digitando...`
      : typingUsers.length > 1
        ? `${typingUsers.slice(0, -1).join(', ')} e ${typingUsers[typingUsers.length - 1]} estão digitando...`
        : null

  return (
    <main className='transition-all h-full xl:w-3/4 w-full bg-cover bg-white bg-opacity-10 backdrop-blur-xl rounded-lg flex flex-col'>

      <div className='overflow-y-auto flex-1 gap-3 flex flex-col rounded-3xl p-5 scrollbar scrollbar-thumb-emerald-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-track-rounded-md'>
        <div className='my-10 block xl:hidden' />
        {messages.map((data, index) => (
          !data.you
            ? <MenssageFriend data={data} key={index} />
            : <MenssageUser data={data} key={index} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className='px-6 h-5 flex items-center'>
        {typingLabel && (
          <span className='text-sm text-emerald-400 italic'>{typingLabel}</span>
        )}
      </div>

      <div className='flex-shrink-0 flex flex-col justify-center rounded-3xl px-4 pb-4'>
        <div className='flex items-center relative'>
          <input
            onChange={e => {
              if (e.target.value.length <= MAX_CHARS) setValue(e.target.value)
            }}
            onBlur={() => socket.emit('stopTyping', { username })}
            onKeyDown={e => {
              socket.emit('typing', { username })
              if (e.key === 'Enter') sendMessage()
            }}
            value={value}
            type="text"
            placeholder="Digite uma mensagem..."
            className='border shadow-xl w-full py-5 pl-6 pr-28 rounded-3xl focus:outline-none'
          />
          <div className='absolute right-4 flex items-center gap-2'>
            <span className={`text-xs font-mono ${value.length > MAX_CHARS * 0.9 ? 'text-red-400' : 'text-gray-400'}`}>
              {MAX_CHARS - value.length}
            </span>
            <button
              onClick={sendMessage}
              className='transition-all rounded-full z-10 flex items-center justify-center bg-emerald-400/[0.4] p-2 hover:bg-emerald-400'>
              <ArrowRightIcon className='w-6 h-6 shadow-2xl' />
            </button>
          </div>
        </div>
      </div>

    </main>
  )
}

export default Chat
