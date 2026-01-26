import CommentForm from "./commentForm";
import CommentList from "./commentList";
import { useState } from "react";
export default function CommentSection({postId}) {
    const [comment,setComment] = useState([]);
     const [refresh, setRefresh] = useState(false);
    return (
        <div className="commentSection">
            
            <CommentList postId={postId} comment={comment} setComment={setComment} refresh={refresh}/>
            <CommentForm postId={postId} onCommentAdded={() => setRefresh(prev => !prev)}/>
        </div>


    );
}