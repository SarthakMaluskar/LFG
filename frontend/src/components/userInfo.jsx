import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Sidebar1 from './sidebar1';
import '../styles/userInfo.css';

function UserInfo() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [clientId, setClientId] = useState("");
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [isFriend, setIsFriend] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/userInfo/${id}`,
                    { withCredentials: true }
                );
                setUser(res.data.user);
                setClientId(res.data.clientId);
                setPosts(res.data.posts || []);
                setFriends(res.data.friends || []);
                setIsFriend(res.data.isFriend);
                setRequestSent(res.data.requestAlreadySent);
            } catch (err) {
                console.log(err);
                navigate('/');
            }
        };
        fetchUser();
    }, [id]);

    const handleAddFriend = async () => {
        try {
            await axios.post(
                'http://localhost:5000/api/friends/request',
                { userId: user._id },
                { withCredentials: true }
            );
            setRequestSent(true);
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImagePreview(URL.createObjectURL(file));
    };

    if (!user) return <div className="ui-loading">Loading...</div>;

    const isOwnProfile = user._id === clientId;
    const avatarLetter = user.username?.[0]?.toUpperCase();

    const handleMessage = async () =>{
        const res = await axios.post("http://localhost:5000/api/chats", {
            member1 : user._id,
        }, {withCredentials : true})

        navigate(`/chats/${res.data.chatId}`, {
            state : {username : user.username}
        });

        
    }

    return (
        <>
            <Navbar />

            <div className="ui-layout">
                <Sidebar1 userId={clientId} />

                <div className="ui-page">

                    {/* Banner */}
                    <div className="ui-banner" />

                    {/* Profile Header */}
                    <div className="ui-profile-header">

                        <div className="ui-profile-left">

                            <div className="ui-avatar-wrap">
                                {imagePreview
                                    ? <img src={imagePreview} alt="avatar" className="ui-avatar-img" />
                                    : <div className="ui-avatar-letter">{avatarLetter}</div>
                                }
                                {isOwnProfile && (
                                    <>
                                        <button
                                            className="ui-avatar-edit"
                                            onClick={() => fileInputRef.current.click()}
                                            title="Change profile picture"
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                            </svg>
                                        </button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleImageChange}
                                        />
                                    </>
                                )}
                            </div>

                            <div className="ui-name-block">
                                <h1 className="ui-username">{user.username}</h1>
                                <span className="ui-tag">@{user.username?.toLowerCase()}</span>
                            </div>

                        </div>

                        {!isOwnProfile && (
                            <div>
                                 <button onClick={handleMessage} className='ui-friend-btn'>Message</button>
                            <button
                                className={`ui-friend-btn ${isFriend ? 'ui-friend-btn--friends' : requestSent ? 'ui-friend-btn--sent' : ''}`}
                                onClick={handleAddFriend}
                                disabled={isFriend || requestSent}
                            >
                                {isFriend ? '✓ Friends' : requestSent ? '✓ Request Sent' : '+ Add Friend'}
                            </button>

                            </div>
                           
                        )}

                    </div>

                    {/* Bio + Stats */}
                    <div className="ui-meta-strip">
                        <p className="ui-bio">
                            GG
                        </p>
                        <div className="ui-stats">
                            <div className="ui-stat">
                                <span className="ui-stat-num">{posts.length}</span>
                                <span className="ui-stat-label">Posts</span>
                            </div>
                            <div className="ui-stat">
                                <span className="ui-stat-num">{friends.length}</span>
                                <span className="ui-stat-label">Friends</span>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="ui-body">

                        <div className="ui-section">
                            <h2 className="ui-section-title">Posts</h2>
                            {posts.length === 0
                                ? <p className="ui-empty">No posts yet.</p>
                                : posts.map(post => (
                                    <div key={post._id} className="ui-post">
                                        <div className="ui-post-top">
                                            <span className="ui-post-tag">{post.game}</span>
                                        </div>
                                        <h3 className="ui-post-title">{post.title}</h3>
                                        <p className="ui-post-desc">{post.description}</p>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="ui-section ui-section--friends">
                            <h2 className="ui-section-title">Friends</h2>
                            {friends.length === 0
                                ? <p className="ui-empty">No friends yet.</p>
                                : friends.map(friend => (
                                    <div
                                        key={friend._id}
                                        className="ui-friend-item"
                                        onClick={() => navigate(`/users/${friend._id}`)}
                                    >
                                        <div className="ui-friend-avatar">
                                            {friend.username?.[0]?.toUpperCase()}
                                        </div>
                                        <span className="ui-friend-name">{friend.username}</span>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default UserInfo;