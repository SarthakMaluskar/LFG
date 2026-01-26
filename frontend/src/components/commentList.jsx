import { useState, useEffect } from "react";
import axios from "axios";

export default function CommentList({ postId, setComment, comment, refresh }) {

    useEffect(() => {

        if (!postId) return;

        const fetchComment = async () => {
            const res = await axios.get(`http://localhost:5000/api/postDetails/${postId}`)

            setComment(res.data.comments);
        }

        fetchComment();

    }, [postId, refresh])

    return (
        <div className="commentList">
            <h3>Comments down</h3>
            {comment.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                comment.map((c, index) => (
                    <div key={c._id || index} className="comment">
                        <p>{c.text}</p>
                    </div>
                ))
            )}


        </div>



    );
}