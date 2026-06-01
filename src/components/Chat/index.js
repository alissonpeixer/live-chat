import { ArrowUpIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from "react"

import { MenssageFriend } from "./MenssageFriend"
import { MenssageUser } from "./MenssageUser"

const MAX_CHARS = 500

const Chat = ({ username, socket, users }) => {
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

  const sendMessage = () => {
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

  const onlineCount = users?.length ?? 0

  return (
    <main className="flex-1 flex flex-col h-full xl:rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden mt-16 xl:mt-0">

      <header className="flex items-center gap-3 px-5 py-4 border-b border-white/10 flex-shrink-0">
        <div className="flex flex-col">
          <span className="text-white font-bold text-base">Chat Global</span>
          <span className="text-slate-400 text-xs">{onlineCount} {onlineCount === 1 ? 'pessoa' : 'pessoas'} online</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]" />
          <span className="text-emerald-400 text-xs font-medium">ao vivo</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-20">
            <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-slate-400 text-sm">Nenhuma mensagem ainda.</p>
            <p className="text-slate-600 text-xs mt-1">Seja o primeiro a escrever!</p>
          </div>
        )}
        {messages.map((data, index) => (
          !data.you
            ? <MenssageFriend data={data} key={index} />
            : <MenssageUser data={data} key={index} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex-shrink-0 border-t border-white/10 px-4 py-3">
        {typingLabel && (
          <p className="text-xs text-emerald-400 italic mb-2 px-1">{typingLabel}</p>
        )}
        <div className="flex items-center gap-3">
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
            className="flex-1 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-emerald-400/50 focus:bg-white/8 transition-all text-sm"
          />
          <div className="flex items-center gap-2 flex-shrink-0">
            {value.length > MAX_CHARS * 0.8 && (
              <span className={`text-xs font-mono ${value.length > MAX_CHARS * 0.95 ? 'text-red-400' : 'text-slate-400'}`}>
                {MAX_CHARS - value.length}
              </span>
            )}
            <button
              onClick={sendMessage}
              disabled={!value.trim()}
              className="w-11 h-11 rounded-2xl flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20 flex-shrink-0"
            >
              <ArrowUpIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

    </main>
  )
}

export default Chat
