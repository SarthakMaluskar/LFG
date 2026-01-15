import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import "../styles/login.css"
import username_img from '../assets/user.png'
import pass_img from '../assets/pass.png'
export default function LoginPage({current}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/api/login", {
            username: username,
            password: password
        }, { withCredentials: true })
        setUsername("");
        setPassword("");

    }

    return (
        
            <div className="container">
                <div className="title">Login</div>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="input">
                            <img src={username_img} alt="" className="logo" />
                            <input type="text" placeholder='Username' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                        </div>
                        <div className="input">
                            <img src={pass_img} alt="" className="logo" />
                            <input type="password" placeholder='Password' name="" id="" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="forgot-pass">Forgot password?</div>
                    </div>

                    <div className="submit-button">
                        <button>Login</button>
                    </div>

                </form>

                <div className="signup-prompt">Dont have an account? <button onClick={current} className="signup-button">Signup</button></div>
            </div>

        
    );
}