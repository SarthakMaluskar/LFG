
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function UserInfo() {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(
                `http://localhost:5000/api/userInfo/${id}`
            );
            setUser(res.data);
        };

        fetchUser();
    }, [id]);


    return (
        
    <h1>Hello {user?.username}</h1>

    );
}