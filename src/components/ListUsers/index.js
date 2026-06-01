import { useEffect } from "react"
import { ListFriend } from "./ListFriend"
import { ListUser } from "./ListYou"

export const ListUsers = ({ socket, users, setUsers }) => {

  useEffect(() => {
    socket.on('userLogin', usersApi => {
      setUsers(prev => [...prev, ...usersApi])
    })

    socket.on('notifyUserJoined', (userApi) => {
      setUsers(prev => [...prev, userApi.data])
    })

    socket.on('notifyUserLeft', (userApi) => {
      if (!userApi.socketId) return
      setUsers(prev => prev.filter(u => u.socketId !== userApi.socketId))
    })

    socket.on('isTyping', ({ socketId }) => {
      setUsers(items => items.map(item =>
        item.socketId === socketId ? { ...item, isTyping: true } : item
      ))
    })

    socket.on('noTyping', ({ socketId }) => {
      setUsers(items => items.map(item =>
        item.socketId === socketId ? { ...item, isTyping: false } : item
      ))
    })

    return () => {
      socket.off('userLogin')
      socket.off('notifyUserJoined')
      socket.off('notifyUserLeft')
      socket.off('isTyping')
      socket.off('noTyping')
    }
  }, [socket, setUsers])

  return (
    <aside className="
      fixed top-0 left-0 right-0 z-40 xl:static
      xl:w-72 xl:flex-shrink-0
      xl:h-full h-16
      xl:rounded-2xl
      flex xl:flex-col
      bg-slate-900/80 backdrop-blur-xl
      border-b xl:border border-white/10
      shadow-2xl
    ">

      <div className="hidden xl:flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]" />
        <span className="text-white font-bold text-base tracking-wide">Live Chat</span>
        <span className="ml-auto bg-emerald-400/20 text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded-full">
          {users.length} online
        </span>
      </div>

      <div className="hidden xl:block px-4 pt-3 pb-1">
        <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Participantes</span>
      </div>

      <div className="flex xl:flex-col gap-2 overflow-x-auto xl:overflow-y-auto xl:overflow-x-hidden px-3 xl:px-4 xl:pb-4 items-center xl:items-stretch flex-1">
        {users.map((data, id) => (
          !data.you
            ? <ListFriend key={id} data={data} />
            : <ListUser key={id} data={data} />
        ))}
      </div>

    </aside>
  )
}
