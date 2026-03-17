import { Link } from 'react-router-dom';
import CommentSection from './commentSection';
import '../styles/sidebar2.css';

function Sidebar2({ togglePost, friends, postTitle, activePostId, onClose }) {

    return (
        <div className={togglePost ? "side-bar-2-toggled" : "side-bar-2"}>

            {!togglePost && (
                <>
                    <div className="top">
                        <div className="top-inner">
                            <div className="top-row">
                                <span className="top-label">Friends</span>
                            </div>
                        </div>
                    </div>

                    <div className="friends-list">
                        {friends.map(friend => (
                            <div key={friend._id} className="friend-item">
                                <div className="friend-avatar">
                                    {friend.username?.[0]?.toUpperCase()}
                                </div>
                                <Link to={`/users/${friend._id}`}>
                                    {friend.username}
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {togglePost && (
                <>
                    <div className="top">
                        <div className="top-inner">
                            <div className="top-row">
                                <span className="top-label">Post Details</span>
                                <button className="exit-button" onClick={onClose}>✕</button>
                            </div>
                            <h1 className="postTitle">{postTitle}</h1>
                        </div>
                    </div>

                    <div className="comment-section-main-page">
                        <CommentSection postId={activePostId} togglePost={togglePost} />
                    </div>
                </>
            )}

        </div>
    );
}

export default Sidebar2;