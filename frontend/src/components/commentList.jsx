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
        })

        console.log("comment deleted!!!!!!");
        setDeleteToggle(!deleteToggle);

    }


    useEffect(() => {

        if (!postId) return;

        const fetchComment = async () => {
            const res = await axios.get(`http://localhost:5000/api/postDetails/${postId}`, { withCredentials: true })
            console.log(res.data.comments);
            setComment(res.data.comments);
            console.log(res.data.userId);
            setUserId(res.data.userId);
        }

        fetchComment();

    }, [postId, refresh, deleteToggle])

    return (
        <div className="commentList">
            <h3>Comments down</h3>
            {comment.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                comment.map((c, index) => (
                    <div key={c._id || index} className="comment">
                        <div className="comment">
                            <h1>
                                <Link to={`/users/${c.userId._id}`}>
                                    {c.userId.username}
                                </Link>
                            </h1>
                            <p>{c.text}</p>
                            {console.log(c.userId._id)}
                            {(c.userId._id == userId) && (<button onClick={() => { deleteComment(c._id) }}>Delete</button>)}
                        </div>

                    </div>
                ))
            )}


        </div>



    );
}