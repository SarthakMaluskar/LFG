import axios from 'axios'
import { useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom";

import '../styles/mainPage.css'
import CommentSection from './commentSection';

function MainPage() {

    const navigate = useNavigate();


    //all States
    const [gotPosts, setPosts] = useState([]);
    const [selectedGame, setSelectedGame] = useState("All Games");
    const [activePostId, setActivePostId] = useState("");
    const [togglePost, setTogglePost] = useState(false);
    
    const [postTitle,setPostTitle] = useState("");

    const getPosts = async () => {
        const posts = await axios.get("http://localhost:5000/api/posts", {
            params: {
                game: selectedGame
            }
        });
        setPosts(posts.data);
        
    }

    const deletePost = async (id) => {
        axios.delete(`http://localhost:5000/api/posts/${id}`,
            { withCredentials: true }
        );
    }




    useEffect(() => {

        //logic to get post info in detail
        const getInfo = async (postId) => {

            if (!activePostId) return;
            const res = await axios.get(`http://localhost:5000/api/postDetails/${postId}`, {
                
            })

            // setComments(res.data.post);
            setPostTitle(res.data.post.title);
            
            
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




    return (
        <>
            <div className="navbar">
                <div className="navbar-title">LFG</div>
                <div className="navbar-search">

                    <div className="navbar-search-text">
                        <input type="text" />
                    </div>
                </div>


                <div className="navbar-options">
                    <div className="navbar-option">Home</div>
                    <div className="navbar-option">About</div>\
                    <Link to="/">Login</Link>

                    <Link to="/createPost">Create Post</Link>
                </div>
            </div>

            <div className="main-content">
                <div className="side-bar">
                    <h1>hello</h1>
                </div>

                <div className={togglePost ? "posts-toggled" : "posts"}>

                    {gotPosts.map((post) => {
                        return (
                            <div onClick={() => {
                                setTogglePost(true);
                                setActivePostId(post._id);
                              }} className='post' key={post._id}>
                                <h2>{post.title}</h2>
                                <p>{post.author.username}</p>
                                <p>{post.description}</p>
                                <button onClick={(e) => 
                                    { 
                                        e.stopPropagation();
                                        deletePost(post._id);}}>Delete</button>
                            </div>

                        );
                    })}

                </div>

                <div className={togglePost ? "side-bar-2-toggled" : "side-bar-2"}>
                    {togglePost && (<button className='exit-button' onClick={() => setTogglePost(false)}>X</button>)}
                    <h1 className='postTitle'>{postTitle}</h1>
                    <CommentSection postId={activePostId}/>
                    
                </div>

            </div>

        </>



    );
}

export default MainPage;