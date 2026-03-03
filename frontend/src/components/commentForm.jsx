import { useState } from "react";
import axios from "axios";
import '../styles/commentForm.css'
export default function CommentForm({ postId, onCommentAdded }) {

    const [commentText, setCommentText] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`http://localhost:5000/api/postDetails/${postId}/comment`, {
            comment: commentText,
            
        },{withCredentials : true} )
        onCommentAdded();
        setCommentText("");
    }

    return (
        <form onSubmit={handleSubmit} className="comment-input-form">
            
                <div className="commentInput">
                    <input className="commentInput" type="text" value={commentText} onChange={(e) => { setCommentText(e.target.value) }} placeholder="Write Your comment" />
                </div>

                <div className="comment-submit-button">
                    <button className="comment-submit-button">Submit</button>
                </div>
                    
        </form>
    );
}