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
  }, [socket])

  return (
    <main className="fixed z-40 p-3 shadow-2xl container flex-1 bg-zinc-900 xl:bg-white xl:bg-opacity-10 xl:backdrop-blur-xl h-16 flex items-center xl:rounded-2xl xl:h-full xl:flex xl:flex-col xl:p-5 xl:relative">

      <div className="hidden xl:flex items-center justify-between pb-3 px-5 w-full">
        <span className="text-white text-xs font-semibold uppercase tracking-widest">
          Online
        </span>
        <span className="text-emerald-400 text-xs font-bold">
          {users.length}
        </span>
      </div>

      <div className="truncate transition-all xl:flex-1 flex xl:flex-col gap-3 overflow-y-auto scrollbar scrollbar-thumb-emerald-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-track-rounded-md w-full">
        {users.map((data, id) => (
          !data.you
            ? <ListFriend key={id} data={data} />
            : <ListUser key={id} data={data} />
        ))}
      </div>

    </main>
  )
}
