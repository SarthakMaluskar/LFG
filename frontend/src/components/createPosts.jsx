import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';

import { useNavigate } from "react-router-dom";




export default function CreatePost() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedGame, setSelectedGame] = useState("");
    const [tags, setSelectedTag] = useState([])
    const navigate = useNavigate();

    const toggleTag = (tag) => {
        setSelectedTag((prev) => {
            return prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        }

        )
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/api/posts", {
            title: title,
            description: description,
            selectedGame : selectedGame,
            tags : tags

        }, { withCredentials: true })

        navigate("/");
    }

    const options = ["PC", "XBOX", "MOBILE", "18+"];

    return (
        <>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                <input type="text" placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }} />
                <select value={selectedGame} onChange={e => setSelectedGame(e.target.value)}>
                    <option value="PUBG">BGMI/PUBG</option>
                    <option value="VALORANT">Valorant</option>
                    <option value="TERRARIA">Terraria</option>
                </select>

                {options.map(tag => (
                    <label key={tag}>
                        <input
                            type="checkbox"
                            value={tag}
                            checked={tags.includes(tag)}
                            onChange={() => toggleTag(tag)}
                        />
                        {tag}
                    </label>
                ))}

                <button>Submit</button>
            </form>

        </>
    );
}