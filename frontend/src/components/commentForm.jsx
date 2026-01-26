import { useState } from "react";
import axios from "axios";

export default function CommentForm({postId,onCommentAdded}) {
    
    const [commentText, setCommentText] = useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        axios.post(`http://localhost:5000/api/postDetails/${postId}/comment`,{
            comment : commentText,
        })
        onCommentAdded();
        setCommentText("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="commentForm">
                <input className="commentInput" type="text" value={commentText} onChange={(e)=>{setCommentText(e.target.value)}} placeholder="Write Your comment" />
                <button className="comment-submit-button">Submit</button>
            </div>

        </form>
    );
}