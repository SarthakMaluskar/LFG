import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import username_img from '../assets/user.png'
import pass_img from '../assets/pass.png'
import '../styles/signup.css'
export default function SignupPage({current}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/api/signup", {
            username: username,
            password: password
        })
        setUsername("");
        setPassword("");

    }

    return (
        <div className="authcontainer">
            <div className="title">Signup</div>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <div className="input">
                        <img src={username_img} alt="" className="logo" />
                        <input type="text" placeholder='email' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    <div className="input">
                        <img src={username_img} alt="" className="logo" />
                        <input type="text" placeholder='Username' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    
                    <div className="input">
                        <img src={pass_img} alt="" className="logo" />
                       <input type="password" placeholder='Password' name="" id="" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    
                </div>

                <div className="signup-submit-button">
                    <button>Signup</button>
                </div>

            </form>

            <div className="signup-prompt">Already have an account? <button onClick={current} className="signup-button">Login</button></div>
        </div>
    );
}


