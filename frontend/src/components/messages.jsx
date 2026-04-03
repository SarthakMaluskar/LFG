import { useLocation, useParams } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar1 from "./sidebar1";
import '../styles/messages.css'
import { useState, useEffect, useRef } from "react";
import { socket } from "../socket";
import axios from "axios";

export default function Messages() {

    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null);

    const location = useLocation();
    const { chatId } = useParams();

    const user = JSON.parse(localStorage.getItem("user"));
    const Id = user?.id;

    const username = location.state?.username;

    const [receiverId, setReceiverId] = useState(null);

    useEffect(() => {
        if (location.state?.userId) {
            setReceiverId(location.state.userId);
            localStorage.setItem("receiverId", location.state.userId);
        } else {
            const saved = localStorage.getItem("receiverId");
            if (saved) setReceiverId(saved);
        }
    }, [location.state]);

    useEffect(() => {
        if (!Id || !receiverId) return;

        const fetchMessages = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/messages", {
                    params: {
                        senderId: Id,
                        receiverId
                    }
                }, { withCredentials: true });

                setMessages(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMessages();
    }, [Id, receiverId]);

    // ✅ auto scroll on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        socket.off("receive_message");

        socket.on("receive_message", (newMsg) => {
            setMessages(prev => [...prev, newMsg]);
        });

        return () => socket.off("receive_message");
    }, []);

    const handleSend = () => {
        if (!text.trim()) return;

        if (!Id || !receiverId || !chatId) {
            console.log("❌ Not ready:", { Id, receiverId, chatId });
            return;
        }

        socket.emit("send_message", {
            chatId,
            senderId: Id,
            toUserId: receiverId,
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
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`msg ${msg.senderId === Id ? "right" : "left"}`}
                            >
                                {msg.message}
                            </div>
                        ))}
                        <div ref={bottomRef} /> {/* ✅ scroll target */}
                    </div>

                    {/* Input */}
                    <div className="messages-input">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="msg-input"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()} // ✅ bonus: enter to send
                        />
                        <button
                            onClick={handleSend}
                            className="send-btn"
                            disabled={!Id || !receiverId || !chatId}
                        >
                            Send
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}