import { useEffect, useState } from "react"


import { ListFriend } from "./ListFriend"
import { ListUser } from "./ListYou"


export const ListUsers = ({ socket, users, setUsers }) => {

  const [typing, setTyping] = useState({})

  useEffect(() => {

    if (users.length <= 1) {
      socket.on('userLogin', usersApi => {
        usersApi.map(user => {
          setUsers(prevState => [
            ...prevState,
            user
          ])
        })
      })
    }

    socket.on('notifyUserJoined', (userApi) => {
      console.log(userApi)
      setUsers(prevState => [
        ...prevState,
        userApi.data
      ])
    })

    socket.on('notifyUserLeft', async (userApi) => {
      if (!userApi.socketId) return
      setUsers(prevState => (
        prevState.filter((value, i) => value.socketId !== userApi.socketId)
      ))


    })

    socket.on('isTyping', (typi) => {
      setUsers(items => items.map(item => {

        if (item.socketId === typi) {
          return {
            ...item,
            isTyping: true
          }
        }

        return {
          ...item
        }

      }))
    })

    socket.on('noTyping', (typi) => {
      console.log(typi)
      setUsers(items => items.map(item => {

        if (item.socketId === typi) {
          return {
            ...item,
            isTyping: false
          }
        }

        return {
          ...item
        }

      }))
    })



    return () => {
      socket.off('noTyping')
      socket.off('notifyUserLeft')
      socket.off('notifyUserJoined')
      socket.off('userLogin')
      socket.off('isTyping')
    }
  }, [socket])



  console.log(users)
  return (
    <main className="fixed z-40 p-3 shadow-2xl  container flex-1 bg-zinc-900 xl:bg-white xl:bg-opacity-10 xl:backdrop-blur-xl  h-16 flex items-center xl:rounded-2xl xl:h-full xl:block xl:p-5 xl:relative">


      <div className="truncate  transition-all xl:h-full flex xl:flex-col gap-3 overflow-y-auto scrol scrollbar scrollbar-thumb-emerald-400  scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-track-rounded-md">

        {

          users.map((data, id) => (
            !data.you ?

              <ListFriend key={id} data={data} />
              :
              <ListUser key={id} data={data} />

          ))

        }

      </div>


    </main>
  )
}
