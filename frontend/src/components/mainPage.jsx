import axios from 'axios'
import { useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom";

function MainPage() {

    const navigate = useNavigate();

    const getPosts = async () => {
        const posts = await axios.get("http://localhost:5000/api/posts", {
            params: {
                game: selectedGame
            }
        });
         setPosts(posts.data);
         console.log("got posts");
    }

    const deletePost = async(id) =>{
        axios.delete(`http://localhost:5000/api/posts/${id}`,
            {withCredentials :true}
        );
    }
    const [gotPosts, setPosts] = useState([]);
    const [selectedGame, setSelectedGame] = useState("");

    useEffect(() => {
        const checkAuth = async() =>{

            try{
                const res = await axios.get("http://localhost:5000/api/me", {
                withCredentials : true
            })

            if(!res.data.authenticated){
                navigate('/');
                console.log('login to continue');
            }
            }catch(err){
                navigate('/');
                console.log(err);
            }
            
        }

        checkAuth();
    },[]);


    useEffect(() => {
        getPosts();
    }, [selectedGame])



//i have to add gotPosts in the use effect for the delete to work
    return (
        <>
            <div>
                <Link to="/">Login</Link>
                
                <Link to ="/createPost">Create Post</Link>
                <h1>Looking for Group?</h1>
                <select value={selectedGame} onChange={e => setSelectedGame(e.target.value)}>
                    <option value="All Games">All Games</option>
                    <option value="BGMI">BGMI</option>
                    <option value="VALORANT">Valorant</option>
                    <option value="TERRARIA">Terraria</option>
                </select>

            </div>

            <div>
                {gotPosts.map((post)=>{
                    return(
                        <div key={post._id}>
                            <h2>{post.title}</h2>
                            <p>{post.author.username}</p>
                            <p>{post.description}</p>
                            <button onClick={()=>deletePost(post._id)}>Delete</button>
                        </div>
                        
                        
                    );
                })}
            </div>
        </>

    );
}

export default MainPage;