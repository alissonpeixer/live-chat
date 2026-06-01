import Head from "next/head"
import { useState } from "react"
import Chat from "../components/Chat"
import Username from "../components/GetUsername"
import SelectRoom from "../components/SelectRoom"
import { Container } from "../components/Container"
import { ListUsers } from "../components/ListUsers"
import socket from "../../socket"

const App = () => {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState(null)
  const [users, setUsers] = useState([])
  const [activeChat, setActiveChat] = useState("room")
  const [unreadDMs, setUnreadDMs] = useState({})

  const handleJoinRoom = (newRoom) => {
    setRoom(newRoom)
    setUsers([{ username, socketId: socket.id, you: true }])
    setActiveChat("room")
  }

  return (
    <>
      <Head>
        <title>Live Chat</title>
        <meta name="description" content="Live chat com Next.js e Socket.IO" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        {!username ? (
          <Username onLogin={setUsername} />
        ) : !room ? (
          <SelectRoom socket={socket} username={username} onJoin={handleJoinRoom} />
        ) : (
          <>
            <ListUsers
              socket={socket}
              users={users}
              setUsers={setUsers}
              username={username}
              room={room}
              onJoinRoom={handleJoinRoom}
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              unreadDMs={unreadDMs}
              setUnreadDMs={setUnreadDMs}
            />
            <Chat
              username={username}
              socket={socket}
              users={users}
              room={room}
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              setUnreadDMs={setUnreadDMs}
            />
          </>
        )}
      </Container>
    </>
  )
}

export default App
