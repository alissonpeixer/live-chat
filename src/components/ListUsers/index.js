
import { useEffect } from "react"
import socket from "../../../socket"

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

      setUsers(prevState => (
        prevState.filter((value, i) => value.socketId !== userApi.socketId)
      ))


    })

    return () => {

      socket.off('notifyUserJoined')
      socket.off('userLogin')
    }
  }, [socket])


  const filterUser = (userApi) => {

  }
  console.log(users)
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
