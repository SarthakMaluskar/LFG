
import { useState, useEffect } from 'react'
import axios from 'axios'

import {Route,Routes} from 'react-router-dom'
import LoginPage from './components/loginPage.jsx';
import HomePage from './components/homePage.jsx';
import MainPage from './components/mainPage.jsx'
import SignupPage from './components/signupPage.jsx';
import CreatePost from './components/createPosts.jsx'
function App() {
  const [users, setUsers] = useState([]);   // store data from backend

  const fetchAPI = async () => {
    const res = await axios.get("http://localhost:5000/api");
    console.log(res.data.users);
    setUsers(res.data.users);               // update state
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
<div>
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/main" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/createPost" element={<CreatePost/>}/>
        
    </Routes>
    <>
      {/* navbar */}

      {/* <LoginPage/> */}

      {/* {users.map((user, index) => (
        <p key={index}>{user}</p>
      ))} */}

    </>


</div>
  );
}

export default App;
