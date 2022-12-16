import { io } from 'socket.io-client'

const socket = io('http://localhost:9901')


export default socket