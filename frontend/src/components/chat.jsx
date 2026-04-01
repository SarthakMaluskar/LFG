import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Sidebar1 from "./sidebar1";
import Sidebar2 from "./sidebar2";
import { useMain } from "../context/mainContext";
import "../styles/chat.css";
import { useNavigate } from "react-router-dom";

export default function Chat() {
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            const res = await axios.get(
                "http://localhost:5000/chats",
                { withCredentials: true }
            );
            
            setChats(res.data);
        };
        fetchChats();
    }, []);

    const { activePostId, setActivePostId, friends } = useMain();

    const user = JSON.parse(localStorage.getItem("user"));
    const Id = user?.id;

    return (
        <>
            <Navbar />

            {/* ✅ SAME STRUCTURE AS ALERTS */}
            <div className="chat-layout">

                <Sidebar1 userId={Id} />

                <div className="chat-page">

                    <div className="chat-body"> {/* 🔥 IMPORTANT WRAPPER */}

                        <h2 className="chat-title">Messages</h2>

                        {chats.length === 0 ? (
                            <p className="chat-empty">No chats yet</p>
                        ) : (
                            chats.map(chat => (
                                <div onClick={()=>navigate(`/chats/${chat._id}`, {state : {username : chat.username, userId : chat.otherUserId}})} key={chat._id} className="chat-card">
                                   
                                    <div className="chat-left">
                                        <div className="chat-avatar">
                                            {chat.username?.[0] || "U"}
                                        </div>

                                        <div>
                                            <div className="chat-username">
                                                {chat.username || "Unknown"}
                                            </div>

                                            <div className="chat-lastmsg">
                                                {chat.lastMessage}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="chat-time">
                                        {new Date(chat.updatedAt).toLocaleTimeString()}
                                    </div>

                                </div>
                            ))
                        )}

                    </div>
                </div>

                <Sidebar2
                    togglePost={false}
                    friends={friends}
                    postTitle={"does not matter"}
                    activePostId={activePostId}
                    onClose={() => setActivePostId(null)}
                />
            </div>
        </>
    );
}