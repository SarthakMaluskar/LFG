import {useState} from 'react';
import LoginPage from './loginPage';
import SignupPage from './signupPage'
import '../styles/homePage.css'

export default function HomePage() {
    const [onLogin, setOnLogin] = useState(true);

    return (
        
        <div className="big-container">
            <div className="container">
                <div>Hello world</div>
        </div>

            {onLogin ? <LoginPage current={()=>setOnLogin(false)}/> : <SignupPage current={()=>setOnLogin(true)}/>}
        </div>
    );
}