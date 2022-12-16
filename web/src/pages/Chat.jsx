import { ChatArea } from '../components/ChatArea'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useRef, useState } from 'react'

export const Chat = ({ chatMensages, setMensageValue, myRef }) => {
    const [chatValue, setChatValue] = useState('')



    const sendMenssage = () => {
        console.log('1')
        if (!chatValue) return

        setMensageValue({
            valid: true,
            msg: chatValue
        })

        setChatValue('')

    }

    return (
        <main>

            <ChatArea chatMensages={chatMensages} myRef={myRef} />
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