import './Chat.css';

import {useState, useEffect} from "react"
import io, { Manager } from "socket.io-client"

const socket = io.connect("replace with url")

function Chat({ name }) {

    const [message, setMessage] = useState("")
    const [chat, setChat] = useState([])

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", {message, name})
        setMessage("")
    }

    socket.emit("chatLog")

    socket.on("chatLog", (chatLog) => {
        const log = []
        chatLog.forEach((msg) => log.push({name: msg.name, message: msg.message}))
        setChat(log)
    })

    useEffect(() => {
        socket.on("chat", (payload) => {
            setChat([...chat, payload])
        })
    })

    return (
        <>
            <header className='App-header'>Chatter App</header>
            <ul>
                {chat.map((payload, index) => {
                    return(
                        <li key={index}><span>{payload.name}:</span> {payload.message}</li>
                    )
                })}
            </ul>
            <form onSubmit={sendChat}>
                <input type="text" 
                    name="chat" 
                    placeholder='send text' 
                    value={message} 
                    onChange={(e) => {
                    setMessage(e.target.value)
                    }}></input>
                <button className="btn" type="submit">Send</button>
            </form>
        </>
    )
}

export default Chat;
