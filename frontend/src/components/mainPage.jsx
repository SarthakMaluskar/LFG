import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/mainPage.css'

import CommentSection from './commentSection';
import Sidebar1 from './sidebar1';
import Navbar from './navbar';
import Sidebar2 from './sidebar2';


import { socket } from "../socket";



import { useMain } from '../context/mainContext';

function MainPage() {

    
    

    const navigate = useNavigate();

    const {
        gotPosts,
        userId,
        selectedGame,
        setSelectedGame,
        activePostId,
        setActivePostId,
        friends,
        deletePost,
        handleLogout
    } = useMain();

    //socket
    

    const [togglePost, setTogglePost] = useState(false);
    const [postTitle, setPostTitle] = useState("");
    const [postDesc, setPostDesc] = useState("");


    // fetch post details when a post is opened
    useEffect(() => {

        if (!activePostId) return;

        const getInfo = async () => {
            try {

                const res = await axios.get(
                    `http://localhost:5000/api/postDetails/${activePostId}`,
                    { withCredentials: true }
                );

                setPostTitle(res.data.post.title);
                setPostDesc(res.data.post.description);

            } catch (err) {
                console.log(err);
            }
        }

        getInfo();

    }, [activePostId]);


    const CreatePostRouting = () => {
        navigate('/createPost')
    }

    const handleProfile = () => {
        navigate(`/users/${userId}`);
    }

    const handleAlert = () => {
        navigate(`/alerts/${userId}`);
    }


    return (
        <>
            <Navbar
                selectedGame={selectedGame}
                setSelectedGame={setSelectedGame}
                onLogout={handleLogout}
            />

            <div className="main-content">

                <Sidebar1 userId={userId} />

                <div className={togglePost ? "posts-toggled" : "posts"}>

                    {gotPosts.map((post) => {

                        return (

                            <div
                                key={post._id}
                                className='post'
                                onClick={() => {
                                    setTogglePost(true);
                                    setActivePostId(post._id);
                                }}
                            >

                                <div className="post-top-row">

                                    <span className="post-game-tag">
                                        {post.game}
                                    </span>

                                    {post.author?._id === userId && (

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deletePost(post._id);
                                            }}
                                        >
                                            Delete
                                        </button>

                                    )}

                                </div>

                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                                <p onClick={()=>navigate(`/users/${post.author._id}`)}>{post.author?.username}</p>

                            </div>

                        );

                    })}

                </div>

                <Sidebar2
                    togglePost={togglePost}
                    friends={friends}
                    postTitle={postTitle}
                    activePostId={activePostId}
                    onClose={() => setTogglePost(false)}
                />

            </div>

        </>
    );
}

export default MainPage;