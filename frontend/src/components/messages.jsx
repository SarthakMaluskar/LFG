import { useMain } from "../context/mainContext";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar1 from "./sidebar1";
import Sidebar2 from "./sidebar2";
import '../styles/messages.css'
import { useState, useEffect } from "react";
import { socket } from "../socket";

import { useParams } from "react-router-dom";

export default function Messages() {

    const [text, setText] = useState("");

    const { activePostId, setActivePostId, friends } = useMain();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));
    const Id = user?.id;
    const { chatId } = useParams();
    const username = location.state?.username;
    

    const [receiverId, setReceiverId] = useState(null);

    useEffect(() => {
        if (location.state?.userId) {
            setReceiverId(location.state.userId);
        }
    }, [location.state]);



    const handleSend = () => {
        console.log(text)
        console.log(chatId)

        console.log("other user")
        
        socket.emit("send_message", {
            chatId,
            toUserId: receiverId,  // 👈 dynamic
            message: text
        });

        setText("");
    };


    return (
        <>
            <Navbar />

            <div className="messages-layout">

                <Sidebar1 userId={Id} />

                <div className="messages-page">

                    {/* Header */}
                    <div className="messages-header">
                        <div className="messages-user">
                            {username || "Loading..."}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="messages-body">

                        {/* Dummy messages */}
                        <div className="msg left">Hello bro</div>
                        <div className="msg right">Hi!</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>
                        <div className="msg left">Testing UI</div>


                    </div>

                    {/* Input */}
                    <div className="messages-input">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="msg-input" value={text} onChange={(e) => setText(e.target.value)}
                        />
                        <button onClick={handleSend} className="send-btn">Send</button>
                    </div>

                </div>


            </div>
        </>
    );
}