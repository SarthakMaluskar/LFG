import CommentForm from "./commentForm";
import CommentList from "./commentList";
import { useState } from "react";

import '../styles/commentSection.css'

export default function CommentSection({postId,togglePost}) {
    


    const [comment,setComment] = useState([]);
     const [refresh, setRefresh] = useState(false);
    return (
        <div className="commentSection">
            <div className="comment-list">
                 <CommentList postId={postId} comment={comment} setComment={setComment} refresh={refresh}/>
            </div>
           <div className="comment-form">
                <CommentForm postId={postId} onCommentAdded={() => setRefresh(prev => !prev)}/>
           </div>
        </div>


    );
}