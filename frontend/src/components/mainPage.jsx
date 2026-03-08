import axios from 'axios'
import { useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom";

import '../styles/mainPage.css'
import CommentSection from './commentSection';

function MainPage() {

    const navigate = useNavigate();


    //all States
    const [gotPosts, setPosts] = useState([]);
    const [username, setUsername] = useState("");
    const [selectedGame, setSelectedGame] = useState("All Games");
    const [activePostId, setActivePostId] = useState("");
    const [togglePost, setTogglePost] = useState(false);
    const [userId, setUserId] = useState("");


    const [postTitle, setPostTitle] = useState("");
    const [postDesc, setPostDesc] = useState("");

    const getPosts = async () => {
        const posts = await axios.get("http://localhost:5000/api/posts", {
            withCredentials: true,
            params: {
                game: selectedGame
            }
        });
        setPosts(posts.data.posts);
        setUserId(posts.data.userId);
        setUsername(posts.data.username);
    }

    const deletePost = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/posts/${id}`,
                { withCredentials: true }
            );

            // refetch posts from backend
            getPosts();

        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };




    useEffect(() => {

        //logic to get post info in detail
        const getInfo = async (postId) => {

            if (!activePostId) return;
            const res = await axios.get(`http://localhost:5000/api/postDetails/${postId}`, {
                withCredentials: true
            })

            // setComments(res.data.post);
            setPostTitle(res.data.post.title);
            setPostDesc(res.data.post.description);

        }

        getInfo(activePostId);


    }, [activePostId])



    //to check if user is authenticated to view this mainPage
    useEffect(() => {
        const checkAuth = async () => {


            try {
                const res = await axios.get("http://localhost:5000/api/me", {
                    withCredentials: true
                })

                if (!res.data.authenticated) {
                    navigate('/');
                    console.log('login to continue');
                }
            } catch (err) {
                navigate('/');
                console.log(err);
            }

        }

        checkAuth();
    }, []);



    //i have to add gotPosts in the use effect for the delete to work
    useEffect(() => {
        getPosts();
    }, [selectedGame])

    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:5000/api/logout",
                {},
                { withCredentials: true }
            );

            navigate("/");

        } catch (error) {
            console.log(error);
        }
    };

    const CreatePostRouting = () => {
        navigate('/createPost')
    }

    const handleProfile = () =>{
        navigate(`/users/${userId}`);
    }

    const handleAlert = () =>{
        navigate(`/alerts/${userId}`);
    }




    return (
        <>
            <div className="navbar">
                <div className="navbar-title">LFG</div>
                <div className="navbar-center">
                    <div className="navbar-search">
                        <div className="navbar-search-text">
                            <input placeholder="Search posts..." type="text" />
                        </div>
                    </div>
                    <div className="navbar-filter">
                        <select
                            className="navbar-filter-select"
                            value={selectedGame}
                            onChange={(e) => setSelectedGame(e.target.value)}
                        >
                            <option value="All Games">All Games</option>
                            <option value="PUBG">BGMI / PUBG</option>
                            <option value="VALORANT">Valorant</option>
                            <option value="TERRARIA">Terraria</option>
                        </select>
                    </div>
                </div>

                <div className="navbar-options">
                    <div className="navbar-option">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <button onClick={CreatePostRouting}>Create Post</button>
                </div>
            </div>

            <div className="main-content">
                <div className="side-bar">

                    <nav className="side-bar-nav">
                        <button onClick={handleProfile} className="side-bar-nav-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
                            <span>Profile</span>
                        </button>
                        <button className="side-bar-nav-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                            <span>Messages</span>
                        </button>
                        <button onClick={handleAlert} className="side-bar-nav-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                            <span>Alerts</span>
                        </button>
                    </nav>
                </div>

                <div className={togglePost ? "posts-toggled" : "posts"}>

                    {gotPosts.map((post) => {
                        return (
                            <div onClick={() => {
                                setTogglePost(true);
                                setActivePostId(post._id);
                            }} className='post' key={post._id}>
                                <div className="post-top-row">
                                    <span className="post-game-tag">{post.game}</span>
                                    {post.author._id == userId && (
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            deletePost(post._id);
                                        }}>Delete</button>
                                    )}
                                </div>
                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                                <p>{post.author.username}</p>
                            </div>



                        );
                    })}

                </div>

                <div className={togglePost ? "side-bar-2-toggled" : "side-bar-2"}>
                    {togglePost && (
                        <>
                            <div className="top">
                                <div className="top-inner">
                                    <div className="top-row">
                                        <span className="top-label">Post Details</span>
                                        <button className='exit-button' onClick={() => setTogglePost(false)}>✕</button>
                                    </div>
                                    <h1 className='postTitle'>{postTitle}</h1>
                                </div>
                            </div>
                            <div className="comment-section-main-page">
                                <CommentSection postId={activePostId} togglePost={togglePost} />
                            </div>
                        </>
                    )}
                </div>

            </div>

        </>



    );
}

export default MainPage;