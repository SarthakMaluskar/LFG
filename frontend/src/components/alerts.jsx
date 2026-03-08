import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function Alerts() {

    const [requests, setRequests] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await axios.get('http://localhost:5000/api/alerts', { withCredentials: true })
            console.log(response.data)
            setRequests(response.data);
        }

        fetchRequests();
    }, [id])

    const handleAccept = async(senderId) =>{
        
    }

    const handleReject = async(senderId) =>{

    }

    return (
        <>
            <h1>Alerts</h1>
            <div>------------------------------------------------------------------------------------------------------</div>
            <h2>Pending Requests</h2>

            {requests.map(request => {
                return (
                    <div>
                        <div key={request.sender._id}> {request.sender.username}</div>
                        <span><button onClick={()=>{handleAccept(request.sender._id)}}>Accept</button></span> <span><button onClick={()=>{handleReject(request.sender._id)}}>Reject</button></span>
                    </div>

                );

            })}

        </>



    );
}