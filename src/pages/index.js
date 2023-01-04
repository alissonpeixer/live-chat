import Head from "next/head";
import { useState } from "react";
import Chat from "../components/Chat";
import Username from "../components/GetUsername";
import { Container } from "../components/Container";

import { ListUsers } from "../components/ListUsers";
import socket from "../../socket";

const App = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  const sendUsers = async (value) => {
    socket.emit("userJoined", {
      username: value,
      socketId: socket.id,
    });

    setUsers((prevState) => [
      ...prevState,
      {
        username: value,
        socketId: socket.id,
        you: true,
      },
    ]);
  };

  return (
    <>
      <Head>
        <title>Live Chat</title>
        <meta name="description" content="Simple live chat using to NextJs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        {username ? (
          <>
            <ListUsers users={users} socket={socket} setUsers={setUsers} />
            <Chat
              username={username}
              socket={socket}
              setUsername={setUsername}
            />
          </>
        ) : (
          <Username setUsername={setUsername} sendUsers={sendUsers} />
        )}
      </Container>
    </>
  );
};

export default App;
