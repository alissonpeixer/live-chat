import { ChatArea } from '../components/ChatArea'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useState } from 'react'

export const Chat = ({ chatMensages, setMensageValue }) => {
    const [chatValue, setChatValue] = useState('')

    const sendMenssage = () => {
        console.log('1')
        if (!chatValue) return

        setMensageValue({
            valid: true,
            msg: chatValue
        })
    }

    return (
        <main>

            <ChatArea chatMensages={chatMensages} />
            <div className='chat-input-zone'>
                <Input
                    place='Digite aqui uma menssagem'
                    onChange={(e) => setChatValue(e.target.value)}
                    value={chatValue}
                    onKeyDown={e => e.code === 'Enter' && sendMenssage()}
                />
                <Button
                    onClick={() => sendMenssage()}
                    text='ENVIAR'
                />
            </div>

        </main>
    )
}