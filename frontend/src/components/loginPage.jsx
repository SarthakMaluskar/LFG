import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css"
import username_img from '../assets/user.png'
import pass_img from '../assets/pass.png'

export default function LoginPage({current}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit =async (e) => {

        try{
             e.preventDefault();

        await axios.post("http://localhost:5000/api/login", {
            username: username,
            password: password
        }, { withCredentials: true })
        setUsername("");
        setPassword("");
        navigate('/main')
        }catch{
            console.log("wrong username or password");
        }
       
    }

    return (
        
            <div className="authcontainer">
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

                <div className="signup-prompt"> <span id='signup-prompt-text'>Dont have an account?</span> <button onClick={current} className="signup-button">Signup</button></div>
            </div>

    );
}