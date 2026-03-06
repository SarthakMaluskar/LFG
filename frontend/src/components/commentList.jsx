import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/commentList.css'
import { Link, useNavigate } from "react-router-dom";

export default function CommentList({ postId, setComment, comment, refresh }) {

    const [deleteToggle, setDeleteToggle] = useState(false);
    const [userId, setUserId] = useState("");

    async function deleteComment(commentId) {
        await axios.delete(`http://localhost:5000/api/postDetails/comments/${commentId}/`, {
            withCredentials: true,
        });
        setDeleteToggle(!deleteToggle);
    }

    useEffect(() => {
        if (!postId) return;

        const fetchComment = async () => {
            const res = await axios.get(`http://localhost:5000/api/postDetails/${postId}`, { withCredentials: true });
            
            // Reverted back to the original array since the backend is sorting it now
            setComment(res.data.comments);
            setUserId(res.data.userId);
        };

        fetchComment();
    }, [postId, refresh, deleteToggle]);

    return (
        <div className="commentList">
            <h3>Comments</h3>
            {comment.length === 0 ? (
                <p className="comment-empty">No comments yet.</p>
            ) : (
                <div className="comment-wrapper">
                    {comment.map((c, index) => (
                        <div key={c._id || index} className="comment">
                            <div className="comment-body">
                                <Link to={`/users/${c.userId._id}`} className="comment-author">
                                    {c.userId.username}
                                </Link>
                                <p className="comment-text">{c.text}</p>
                            </div>
                            {c.userId._id === userId && (
                                <button
                                    className="comment-delete-btn"
                                    onClick={() => deleteComment(c._id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}