
export const ChatArea = ({ chatMensages, myRef }) => {


    return (
        <div id="chat-area">
            {chatMensages.map((data, id) => (

                <div key={id} id='menssage'>
                    <span>
                        <strong>{data.username.usernameValue}</strong>
                    </span>
                    <span>   {data.msg}</span>
                </div>
            ))}

            <div id="chat-end" ref={myRef}></div>
        </div>
    )
}