import { ArrowUpIcon, ArrowLeftIcon, HashtagIcon } from "@heroicons/react/24/solid"
import { useEffect, useRef, useState } from "react"
import { getAvatarColor } from "../../utils/avatarColor"
import { MenssageFriend } from "./MenssageFriend"
import { MenssageUser } from "./MenssageUser"

const MAX_CHARS = 500

const Chat = ({ username, socket, users, room, activeChat, setActiveChat, setUnreadDMs }) => {
  const audioSendRef = useRef(null)
  const audioNotyRef = useRef(null)
  const bottomRef = useRef(null)
  const activeChatRef = useRef(activeChat)

  const [roomMessages, setRoomMessages] = useState([])
  const [dmConversations, setDmConversations] = useState({})
  const [value, setValue] = useState("")
  const [typingUsers, setTypingUsers] = useState([])
  const [dmTypingUser, setDmTypingUser] = useState(null)

  useEffect(() => { activeChatRef.current = activeChat }, [activeChat])

  useEffect(() => {
    audioSendRef.current = new Audio("/send.mp3")
    audioNotyRef.current = new Audio("/receb.mp3")
  }, [])

  useEffect(() => {
    if (activeChat === "room") return
    if (dmConversations[activeChat]) return
    const target = users.find(u => u.socketId === activeChat)
    if (!target) return
    setDmConversations(prev => ({ ...prev, [activeChat]: { username: target.username, messages: [] } }))
  }, [activeChat, users]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    socket.on("sendStatusCheck", () => {
      if (activeChatRef.current === "room") {
        setRoomMessages(prev => {
          let lastIdx = -1
          for (let i = prev.length - 1; i >= 0; i--) {
            if (prev[i].you && !prev[i].sent) { lastIdx = i; break }
          }
          if (lastIdx === -1) return prev
          return prev.map((m, i) => i === lastIdx ? { ...m, sent: true } : m)
        })
      } else {
        const sid = activeChatRef.current
        setDmConversations(prev => {
          const conv = prev[sid]
          if (!conv) return prev
          let lastIdx = -1
          for (let i = conv.messages.length - 1; i >= 0; i--) {
            if (conv.messages[i].you && !conv.messages[i].sent) { lastIdx = i; break }
          }
          if (lastIdx === -1) return prev
          return { ...prev, [sid]: { ...conv, messages: conv.messages.map((m, i) => i === lastIdx ? { ...m, sent: true } : m) } }
        })
      }
    })

    socket.on("recebMensage", (data) => {
      setRoomMessages(prev => [...prev, data])
      if (activeChatRef.current === "room") {
        audioNotyRef.current?.play()
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
      }
    })

    socket.on("recebDM", (data) => {
      const sid = data.socketId
      setDmConversations(prev => ({ ...prev, [sid]: { username: data.author, messages: [...(prev[sid]?.messages || []), data] } }))
      if (activeChatRef.current !== sid) {
        setUnreadDMs(prev => ({ ...prev, [sid]: (prev[sid] || 0) + 1 }))
        audioNotyRef.current?.play()
      } else {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
      }
    })

    socket.on("isTyping", (data) => {
      const u = data?.username
      if (!u) return
      setTypingUsers(prev => prev.includes(u) ? prev : [...prev, u])
    })
    socket.on("noTyping", (data) => {
      const u = data?.username
      if (!u) return
      setTypingUsers(prev => prev.filter(x => x !== u))
    })
    socket.on("isDMTyping", (data) => setDmTypingUser(data?.username || null))
    socket.on("noDMTyping", () => setDmTypingUser(null))

    return () => {
      socket.off("sendStatusCheck")
      socket.off("recebMensage")
      socket.off("recebDM")
      socket.off("isTyping")
      socket.off("noTyping")
      socket.off("isDMTyping")
      socket.off("noDMTyping")
    }
  }, [socket, setUnreadDMs])

  const sendMessage = () => {
    if (!value.trim()) return
    const timestamp = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    const baseMsg = { you: true, sent: false, menssage: value, author: username, socketId: socket.id, timestamp }

    if (activeChat === "room") {
      socket.emit("stopTyping", { username, room })
      setRoomMessages(prev => [...prev, baseMsg])
      socket.emit("sendMensage", { ...baseMsg, room })
    } else {
      socket.emit("stopTyping", { username, targetSocketId: activeChat })
      setDmConversations(prev => ({
        ...prev,
        [activeChat]: { ...(prev[activeChat] || { username: "" }), messages: [...(prev[activeChat]?.messages || []), baseMsg] },
      }))
      socket.emit("sendDM", { ...baseMsg, targetSocketId: activeChat })
    }

    audioSendRef.current?.play()
    setValue("")
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }

  const handleTyping = () => {
    if (activeChat === "room") socket.emit("typing", { username, room })
    else socket.emit("typing", { username, targetSocketId: activeChat })
  }

  const handleStopTyping = () => {
    if (activeChat === "room") socket.emit("stopTyping", { username, room })
    else socket.emit("stopTyping", { username, targetSocketId: activeChat })
  }

  const isRoom = activeChat === "room"
  const currentMessages = isRoom ? roomMessages : (dmConversations[activeChat]?.messages || [])
  const dmTarget = !isRoom ? (users.find(u => u.socketId === activeChat) || { username: dmConversations[activeChat]?.username || "..." }) : null

  const typingLabel = isRoom
    ? (typingUsers.length === 1 ? `${typingUsers[0]} esta digitando...`
        : typingUsers.length > 1 ? `${typingUsers.slice(0, -1).join(", ")} e ${typingUsers.at(-1)} estao digitando...` : null)
    : (dmTypingUser ? `${dmTypingUser} esta digitando...` : null)

  return (
    <main className="flex-1 flex flex-col h-full xl:rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden mt-16 xl:mt-0">
      <header className="flex items-center gap-3 px-5 py-3.5 border-b border-white/10 flex-shrink-0">
        {isRoom ? (
          <>
            <HashtagIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm">{room}</span>
              <span className="text-slate-400 text-xs">{users.length} {users.length === 1 ? "pessoa" : "pessoas"} online</span>
            </div>
          </>
        ) : (
          <>
            <button onClick={() => setActiveChat("room")} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
              <ArrowLeftIcon className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: getAvatarColor(dmTarget?.username) }}>
              <span className="text-white font-bold text-xs">{dmTarget?.username?.[0]?.toUpperCase()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm">{dmTarget?.username}</span>
              <span className="text-slate-400 text-xs">mensagem privada</span>
            </div>
          </>
        )}
      </header>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
        {currentMessages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-20">
            <div className="w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mb-3">
              <span className="text-2xl">{isRoom ? "💬" : "✉️"}</span>
            </div>
            <p className="text-slate-400 text-sm">{isRoom ? "Nenhuma mensagem ainda." : `Inicie uma conversa com ${dmTarget?.username}.`}</p>
          </div>
        )}
        {currentMessages.map((data, index) => (
          !data.you ? <MenssageFriend data={data} key={index} /> : <MenssageUser data={data} key={index} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex-shrink-0 border-t border-white/10 px-4 py-3">
        {typingLabel && <p className="text-xs text-emerald-400 italic mb-2 px-1">{typingLabel}</p>}
        <div className="flex items-center gap-3">
          <input
            onChange={e => { if (e.target.value.length <= MAX_CHARS) setValue(e.target.value) }}
            onBlur={handleStopTyping}
            onKeyDown={e => { handleTyping(); if (e.key === "Enter") sendMessage() }}
            value={value}
            type="text"
            placeholder={isRoom ? `Mensagem em #${room}...` : `Mensagem para ${dmTarget?.username}...`}
            className="flex-1 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-emerald-400/50 transition-all text-sm"
          />
          <div className="flex items-center gap-2 flex-shrink-0">
            {value.length > MAX_CHARS * 0.8 && (
              <span className={`text-xs font-mono ${value.length > MAX_CHARS * 0.95 ? "text-red-400" : "text-slate-400"}`}>{MAX_CHARS - value.length}</span>
            )}
            <button onClick={sendMessage} disabled={!value.trim()} className="w-11 h-11 rounded-2xl flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-900/30">
              <ArrowUpIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Chat
