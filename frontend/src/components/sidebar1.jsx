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

    return (
        <div className="side-bar">
            <nav className="side-bar-nav">

                <button
                    onClick={handleProfile}
                    className="side-bar-nav-item"
                >
                    <span>Profile</span>
                </button>

                <button className="side-bar-nav-item">
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