
export const ChatArea = ({ chatMensages }) => {
    console.log(chatMensages)
    return (
        <div id="chat-area">
            {chatMensages.map((data, id) => (
                console.log(data),
                <div key={id}>
                    <span>{data.username.usernameValue}</span>
                    <span>   {data.msg}</span>
                </div>
            ))}

            <div></div>
        </div>
    )
}