import { useState } from 'react'
import io from 'socket.io-client'


connect()
async function connect() {
  await fetch('/api/socket')


}

let socket = io()

export default socket
