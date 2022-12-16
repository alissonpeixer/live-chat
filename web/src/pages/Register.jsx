import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useState } from "react"



export const Register = ({ setSocketState, setUsername }) => {

    const [usernameValue, setUsernameValue] = useState('')

    const sendUsername = () => {

        if (!usernameValue) return

        setSocketState(true);

        setUsername(usernameValue);
    }

    return (
        <main className="custom-main-01">

            <Input
                place='Digite seu username'
                onChange={(e) => setUsernameValue(e.target.value)}
                value={usernameValue}
                onKeyDown={e => e.code === 'Enter' && sendUsername()}
            />

            <Button
                onClick={() => sendUsername()}
                text='ENTRAR'
            />


        </main>
    )
}