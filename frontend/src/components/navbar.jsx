import { useNavigate } from "react-router-dom";
import '../styles/navbar.css';

function Navbar({ selectedGame, setSelectedGame, userId, onLogout }) {

    const navigate = useNavigate();

    const handleCreatePost = () => {
        navigate('/createPost');
    };

    const handleLogout = async () => {
        if (onLogout) onLogout();
    };

    return (
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

                <button onClick={handleCreatePost}>
                    Create Post
                </button>

            </div>

        </div>
    );
}

export default Navbar;