import { useEffect } from "react"


import { ListFriend } from "./ListFriend"
import { ListUser } from "./ListYou"


export const ListUsers = ({ socket, users, setUsers }) => {



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

    return () => {
      socket.off('notifyUserLeft')
      socket.off('notifyUserJoined')
      socket.off('userLogin')
    }
  }, [socket])



  console.log(users)
  return (
    <main className="flex-1 bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl h-full hidden xl:block p-5">


      <div className="h-full flex flex-col gap-3 overflow-y-auto scrol scrollbar scrollbar-thumb-emerald-400  scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-track-rounded-md">
        {

          users.map((data, id) => (
            !data.you ?
              <ListFriend key={id} data={data} /> :
              <ListUser key={id} data={data} />
          ))

        }
      </div>


    </main>
  )
}
