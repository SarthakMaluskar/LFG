import { useNavigate } from "react-router-dom";
import '../styles/sidebar1.css';

function Sidebar1({ userId }) {

    const navigate = useNavigate();

    const handleProfile = () => {
        navigate(`/users/${userId}`);
    };

    const handleAlert = () => {
        navigate(`/alerts/${userId}`);
    };

    const handleMessages = () => {
        navigate('/chats')
    }
    const handleHome = () =>{
        navigate('/main')
    }

    return (
        <div className="side-bar">
            <nav className="side-bar-nav">

                <button
                    onClick={handleHome}
                    className="side-bar-nav-item"
                >
                    <span>Home</span>
                </button>
                <button
                    onClick={handleProfile}
                    className="side-bar-nav-item"
                >
                    <span>Profile</span>
                </button>

                <button onClick={handleMessages} 
                className="side-bar-nav-item">
                    <span>Messages</span>
                </button>

                <button
                    onClick={handleAlert}
                    className="side-bar-nav-item"
                >
                    <span>Alerts</span>
                </button>

            </nav>
        </div>
    );
}

export default Sidebar1;