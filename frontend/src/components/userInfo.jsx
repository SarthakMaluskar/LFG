
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function UserInfo() {
    const [user, setUser] = useState(null);
    const [clientId, setClientId] = useState("");
    

    const { id } = useParams();
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(
                `http://localhost:5000/api/userInfo/${id}`,
                { withCredentials: true }
            );
            setUser(res.data.user);
            setClientId(res.data.clientId);
            
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async () => {
    await axios.post(
        'http://localhost:5000/api/friends/request',
        { userId: user._id },
        { withCredentials: true }
    );

    console.log("friend req sent");
}

    if (!user) return <h1>Loading...</h1>;
    return (
    <>
        <h1>{user?.username}'s Profile Page</h1>
        
        {user?._id != clientId && <button onClick={handleSubmit}>Send friend request</button> }
        
    </>
    
    

    );
}