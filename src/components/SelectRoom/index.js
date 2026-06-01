import { useEffect, useState } from "react"
import { HashtagIcon, PlusIcon } from "@heroicons/react/24/outline"

const PRESET_ROOMS = ["geral"]

const SelectRoom = ({ socket, username, onJoin }) => {
  const [roomCounts, setRoomCounts] = useState({})
  const [custom, setCustom] = useState("")

  useEffect(() => {
    socket.emit("getRooms")
    socket.on("roomsList", (data) => setRoomCounts(data))
    return () => socket.off("roomsList")
  }, [socket])

  const customRooms = Object.keys(roomCounts).filter(r => !PRESET_ROOMS.includes(r))
  const allRooms = [...PRESET_ROOMS, ...customRooms]

  const join = (name) => {
    const room = name.trim().toLowerCase().replace(/\s+/g, "-")
    if (!room) return
    socket.emit("joinRoom", { username, socketId: socket.id, room })
    onJoin(room)
  }

  return (
    <div className="w-full h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-md flex flex-col gap-6">

        <div className="text-center flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-white">Escolha uma sala</h1>
          <p className="text-slate-400 text-sm">
            Olá, <span className="text-emerald-400 font-semibold">{username}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {allRooms.map(r => (
            <button
              key={r}
              onClick={() => join(r)}
              className="flex items-center gap-3 px-5 py-4 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 hover:bg-slate-800/60 transition-all group text-left"
            >
              <HashtagIcon className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
              <span className="text-white font-medium">{r}</span>
              <span className="ml-auto text-xs text-slate-500">
                {roomCounts[r] ? `${roomCounts[r]} online` : "vazio"}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest px-1">
            Sala personalizada
          </span>
          <div className="flex gap-2">
            <input
              value={custom}
              onChange={e => setCustom(e.target.value)}
              onKeyDown={e => e.key === "Enter" && join(custom)}
              placeholder="Nome da sala..."
              className="flex-1 bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-400/50 transition-all text-sm"
            />
            <button
              onClick={() => join(custom)}
              disabled={!custom.trim()}
              className="px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all flex items-center gap-1.5 text-sm font-semibold"
            >
              <PlusIcon className="w-4 h-4" />
              Criar
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SelectRoom
