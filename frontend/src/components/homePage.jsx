import { useState } from 'react';
import LoginPage from './loginPage';
import SignupPage from './signupPage'
import '../styles/homePage.css'
import unoimg from '../assets/uno.jpg'
export default function HomePage() {
    const [onLogin, setOnLogin] = useState(true);

    return (
        <>
            <div className="title">
                Looking for Groups?
            </div>
            <div className="big-container">
                <div className="container">
                    <img className='authpageimage' src={unoimg} alt="" />
                </div>
                <div className="fade">
                    {onLogin ? <LoginPage current={() => setOnLogin(false)} /> : <SignupPage current={() => setOnLogin(true)} />}
                </div>
                
            </div>
        </>
    );
}