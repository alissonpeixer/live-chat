
import { useEffect } from "react"
import socket from "../../../socket"

import { ListFriend } from "./ListFriend"
import { ListUser } from "./ListYou"


export const ListUsers = ({ socket, users, setUsers }) => {



  useEffect(() => {
    socket.on("userLogin", usersApi => {
      usersApi.map(userApi => {
        setUsers(prevState => [
          ...prevState,
          {
            username: userApi.username,
            socketId: userApi.socketId
          }
        ])
      })
    })


    socket.on('notifyUserJoined', (userApi) => {
      setUsers(prevState => [
        ...prevState,
        {
          username: userApi.username,
          socketId: userApi.socketId
        }
      ])
    })

    socket.on('notifyUserLeft', (user) => {

    })

    return () => {

      socket.off('notifyUserJoined')
      socket.off('notifyUserLeft')
    }
  }, [socket])



  return (
    <main className="flex-1 bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl h-full hidden xl:block p-5">


      <div className="h-full flex flex-col gap-3">
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
