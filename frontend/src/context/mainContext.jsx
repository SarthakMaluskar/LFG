import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainContext = createContext();

export function MainProvider({ children }) {

    const navigate = useNavigate();

    const [gotPosts, setPosts] = useState([]);
    const [username, setUsername] = useState("");
    const [selectedGame, setSelectedGame] = useState("All Games");
    const [activePostId, setActivePostId] = useState(null);
    const [userId, setUserId] = useState("");
    const [friends, setFriends] = useState([]);

    const getPosts = async () => {
        try {
            const posts = await axios.get("http://localhost:5000/api/posts", {
                withCredentials: true,
                params: { game: selectedGame }
            });

            setPosts(posts.data.posts);
            setUserId(posts.data.userId);
            setUsername(posts.data.username);

        } catch (err) {
            console.log(err);
        }
    };

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
    };

    // auth check on mount
    useEffect(() => {
        checkAuth();
    }, []);

    // refetch when game filter changes
    useEffect(() => {
        getPosts();
    }, [selectedGame]);

    // fetch friends on mount
    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("http://localhost:5000/api/friends", { withCredentials: true });
            setFriends(res.data);
        };
        getFriends();
    }, []);

    return (
        <MainContext.Provider value={{
            gotPosts,
            username,
            selectedGame, setSelectedGame,
            activePostId, setActivePostId,
            userId,
            friends,
            getPosts,
            deletePost,
            handleLogout,
            checkAuth
        }}>
            {children}
        </MainContext.Provider>
    );
}

export function useMain() {
    return useContext(MainContext);
}