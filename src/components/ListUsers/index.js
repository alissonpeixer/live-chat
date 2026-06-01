import { useEffect, useState } from "react"
import { HashtagIcon, PlusIcon } from "@heroicons/react/24/outline"
import { ListFriend } from "./ListFriend"
import { ListUser } from "./ListYou"

const PRESET_ROOMS = ["geral"]

export const ListUsers = ({
  socket, users, setUsers, username, room,
  onJoinRoom, activeChat, setActiveChat, unreadDMs, setUnreadDMs,
}) => {
  const [allRooms, setAllRooms] = useState(PRESET_ROOMS)
  const [newRoom, setNewRoom] = useState("")
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    socket.on("roomsList", (counts) => {
      const custom = Object.keys(counts).filter(r => !PRESET_ROOMS.includes(r))
      setAllRooms([...PRESET_ROOMS, ...custom])
    })
    socket.on("userLogin", usersApi => {
      setUsers(prev => [...prev, ...usersApi])
    })
    socket.on("notifyUserJoined", (userApi) => {
      setUsers(prev => [...prev, userApi.data])
    })
    socket.on("notifyUserLeft", ({ socketId }) => {
      setUsers(prev => prev.filter(u => u.socketId !== socketId))
    })
    socket.on("notifyUserOffline", ({ socketId }) => {
      setUsers(prev => prev.filter(u => u.socketId !== socketId))
    })
    socket.on("isTyping", ({ socketId }) => {
      setUsers(items => items.map(item =>
        item.socketId === socketId ? { ...item, isTyping: true } : item
      ))
    })
    socket.on("noTyping", ({ socketId }) => {
      setUsers(items => items.map(item =>
        item.socketId === socketId ? { ...item, isTyping: false } : item
      ))
    })

    return () => {
      socket.off("roomsList")
      socket.off("userLogin")
      socket.off("notifyUserJoined")
      socket.off("notifyUserLeft")
      socket.off("notifyUserOffline")
      socket.off("isTyping")
      socket.off("noTyping")
    }
  }, [socket, setUsers])

  const switchRoom = (target) => {
    if (target === room) return
    socket.emit("joinRoom", { username, socketId: socket.id, room: target })
    onJoinRoom(target)
  }

  const createRoom = () => {
    const clean = newRoom.trim().toLowerCase().replace(/\s+/g, "-")
    if (!clean) return
    switchRoom(clean)
    setNewRoom("")
    setCreating(false)
  }

  const openDM = (user) => {
    setActiveChat(user.socketId)
    setUnreadDMs(prev => ({ ...prev, [user.socketId]: 0 }))
  }

  return (
    <aside className="
      fixed top-0 left-0 right-0 z-40 xl:static
      xl:w-60 xl:flex-shrink-0 xl:h-full h-16
      xl:rounded-2xl flex xl:flex-col
      bg-slate-900/80 backdrop-blur-xl
      border-b xl:border border-white/10 shadow-2xl overflow-hidden
    ">

      {/* Mobile bar */}
      <div className="xl:hidden flex items-center gap-3 px-4 h-full w-full">
        <HashtagIcon className="w-4 h-4 text-emerald-400" />
        <span className="text-emerald-400 font-bold text-sm">{room}</span>
        <div className="flex gap-1 ml-2 overflow-hidden">
          {users.slice(0, 5).map((u, i) => (
            <div key={i} className="w-7 h-7 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">{u.username?.[0]?.toUpperCase()}</span>
            </div>
          ))}
        </div>
        <span className="ml-auto text-slate-400 text-xs">{users.length} online</span>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden xl:flex xl:flex-col h-full">

        <div className="flex items-center gap-2 px-4 py-4 border-b border-white/10 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]" />
          <span className="text-white font-bold text-sm">Live Chat</span>
        </div>

        {/* Rooms */}
        <div className="px-3 pt-4 pb-1 flex-shrink-0 flex items-center">
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest px-2">Canais</span>
          <button
            onClick={() => setCreating(v => !v)}
            className="ml-auto p-1 rounded-md hover:bg-white/10 text-slate-500 hover:text-emerald-400 transition-colors"
            title="Criar canal"
          >
            <PlusIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {creating && (
          <div className="px-3 pb-2 flex-shrink-0">
            <div className="flex gap-1">
              <input
                autoFocus
                value={newRoom}
                onChange={e => setNewRoom(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") createRoom()
                  if (e.key === "Escape") { setCreating(false); setNewRoom("") }
                }}
                placeholder="nome-do-canal"
                className="flex-1 bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-400/50 transition-all"
              />
              <button
                onClick={createRoom}
                disabled={!newRoom.trim()}
                className="px-2 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all"
              >
                <PlusIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-0.5 px-2 flex-shrink-0">
          {allRooms.map(r => (
            <button
              key={r}
              onClick={() => switchRoom(r)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all w-full text-left
                ${r === room && activeChat === "room"
                  ? "bg-emerald-400/15 text-emerald-400 font-semibold"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
            >
              <HashtagIcon className="w-3.5 h-3.5 flex-shrink-0" />
              {r}
            </button>
          ))}
        </div>

        {/* Users */}
        <div className="px-3 pt-4 pb-1 flex-shrink-0">
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest px-2">
            Usuários — {users.length}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-0.5 px-2 pb-3">
          {users.map((data, id) => (
            !data.you
              ? <ListFriend
                  key={id}
                  data={data}
                  isActive={activeChat === data.socketId}
                  unread={unreadDMs[data.socketId] || 0}
                  onClick={() => openDM(data)}
                />
              : <ListUser
                  key={id}
                  data={data}
                  isActive={activeChat === "room"}
                  onClick={() => setActiveChat("room")}
                />
          ))}
        </div>

      </div>
    </aside>
  )
}
