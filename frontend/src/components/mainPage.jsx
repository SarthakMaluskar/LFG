import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../styles/mainPage.css'
import CommentSection from './commentSection';

import Sidebar1 from './sidebar1';
import Navbar from './navbar';
import Sidebar2 from './sidebar2';

function MainPage() {

    const navigate = useNavigate();

    //all States
    const [gotPosts, setPosts] = useState([]);
    const [username, setUsername] = useState("");
    const [selectedGame, setSelectedGame] = useState("All Games");
    const [activePostId, setActivePostId] = useState(null);
    const [togglePost, setTogglePost] = useState(false);
    const [userId, setUserId] = useState("");

    const [postTitle, setPostTitle] = useState("");
    const [postDesc, setPostDesc] = useState("");

    const [friends, setFriends] = useState([]);


    const getPosts = async () => {
        try {
            const posts = await axios.get("http://localhost:5000/api/posts", {
                withCredentials: true,
                params: {
                    game: selectedGame
                }
            });

            setPosts(posts.data.posts);
            setUserId(posts.data.userId);
            setUsername(posts.data.username);

        } catch (err) {
            console.log(err);
        }
    }



    const deletePost = async (id) => {
        try {

            await axios.delete(
                `http://localhost:5000/api/posts/${id}`,
                { withCredentials: true }
            );

            getPosts();

        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };



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



    // check authentication first, then fetch posts
    useEffect(() => {

        const checkAuth = async () => {

            try {

                const res = await axios.get(
                    "http://localhost:5000/api/me",
                    { withCredentials: true }
                );

                if (!res.data.authenticated) {
                    navigate('/');
                    return;
                }

                getPosts();

            } catch (err) {

                navigate('/');
                console.log(err);

            }

        }

        checkAuth();

    }, []);



    // refetch posts when game filter changes
    useEffect(() => {

        getPosts();

    }, [selectedGame]);

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("http://localhost:5000/api/friends", { withCredentials: true })

            setFriends(res.data);
        }

        getFriends();
    }, []);



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
                                <p>{post.author?.username}</p>

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