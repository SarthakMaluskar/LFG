import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import Sidebar1 from './sidebar1';
import '../styles/userInfo.css'; // ✅ USE SAME CSS
import { useParams } from "react-router-dom";

export default function Alerts() {

    const [requests, setRequests] = useState([]);
const { id } = useParams();

useEffect(() => {
    const fetchRequests = async () => {
        const response = await axios.get(
            'http://localhost:5000/api/alerts',
            { withCredentials: true }
        );

        console.log(response.data);
        setRequests(response.data);
    };

    fetchRequests();
}, [id]);

const handleAccept = async (senderId) => {
    const res = await axios.post(
        'http://localhost:5000/api/friends/accept',
        { sender: senderId },
        { withCredentials: true }
    );
};

            return (
                <>
                    <Navbar />

                    <div className="ui-layout">
                        <Sidebar1 userId={id} />

                        <div className="ui-page">

                            <div className="ui-body" style={{ gridTemplateColumns: "1fr" }}>

                                <div className="ui-section">
                                    <h2 className="ui-section-title">Alerts</h2>

                                    {requests.length === 0 ? (
                                        <p className="ui-empty">No pending requests</p>
                                    ) : (
                                        requests.map(req => (
                                            <div key={req.sender._id} className="ui-post">

                                                <div className="ui-post-title">
                                                    {req.sender.username}
                                                </div>

                                                <p className="ui-post-desc">
                                                    sent you a friend request
                                                </p>

                                                <div style={{ marginTop: "10px" }}>
                                                    <button
                                                        className="ui-friend-btn"
                                                        onClick={()=>{handleAccept(req.sender._id)} }
                                                    >
                                                        Accept
                                                    </button>

                                                    <button
                                                        className="ui-friend-btn ui-friend-btn--friends"
                                                        style={{ marginLeft: "10px" }}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>

                                            </div>
                                        ))
                                    )}

                                </div>

                            </div>

                        </div>
                    </div>
                </>
            );
        }