import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../styles/createPost.css';

export default function CreatePost() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedGame, setSelectedGame] = useState("VALORANT");
    const [tags, setSelectedTag] = useState([]);
    const navigate = useNavigate();

    const toggleTag = (tag) => {
        setSelectedTag((prev) =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/posts", {
            title, description, selectedGame, tags
        }, { withCredentials: true });
        navigate("/main");
    };

    const options = ["PC", "XBOX", "MOBILE", "18+"];

    return (
        <div className="create-post-page">
            <div className="create-post-container">
                <div className="create-post-header">
                    <span className="create-post-label">New Post</span>
                    <h1 className="create-post-title">Find Your Squad</h1>
                </div>

                <form onSubmit={handleSubmit} className="create-post-form">
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="e.g. Need 2 players for ranked..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-input form-textarea"
                            placeholder="Tell people what you're looking for..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Game</label>
                        <select
                            className="form-input form-select"
                            value={selectedGame}
                            onChange={e => setSelectedGame(e.target.value)}
                        >
                            <option value="PUBG">BGMI / PUBG</option>
                            <option value="VALORANT">Valorant</option>
                            <option value="TERRARIA">Terraria</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Tags</label>
                        <div className="tags-group">
                            {options.map(tag => (
                                <button
                                    type="button"
                                    key={tag}
                                    className={`tag-btn ${tags.includes(tag) ? 'tag-btn-active' : ''}`}
                                    onClick={() => toggleTag(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">Post It</button>
                </form>
            </div>
        </div>
    );
}