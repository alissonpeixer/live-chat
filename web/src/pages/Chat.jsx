import { ChatArea } from '../components/ChatArea'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export const Chat = ({ chatMensages }) => {
    return (
        <main>

            <ChatArea chatMensages={chatMensages} />


        </main>
    )
}