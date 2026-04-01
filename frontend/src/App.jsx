
import { useState, useEffect } from 'react'
import axios from 'axios'
import { socket } from "./socket";
import { Route, Routes } from 'react-router-dom'
import LoginPage from './components/loginPage.jsx';
import HomePage from './components/homePage.jsx';
import MainPage from './components/mainPage.jsx'
import SignupPage from './components/signupPage.jsx';
import CreatePost from './components/createPosts.jsx'
import UserInfo from './components/userInfo.jsx';
import Alerts from './components/alerts.jsx'
import Chat from './components/chat.jsx';
import Messages from './components/messages.jsx';
import { MainProvider,useMain } from './context/mainContext';



<Route path="/main" element={
  <MainProvider>
    <MainPage />
  </MainProvider>
} />


function App() {

 const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;

console.log(userId);

  const [users, setUsers] = useState([]);   // store data from backend

  const fetchAPI = async () => {
    const res = await axios.get("http://localhost:5000/api");
    console.log(res.data.users);
    setUsers(res.data.users);               // update state
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
          
          socket.connect();
  
          // ✅ register user
          socket.emit("register", userId);
  
          return () => {
              socket.disconnect();
          };
      }, [userId]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={
          <MainProvider>
            <MainPage />
          </MainProvider>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/users/:id" element={
          <MainProvider>
            <UserInfo />
          </MainProvider>
        } />
        <Route path="/alerts/:id" element={
          <MainProvider>
            <Alerts />
          </MainProvider>
        } />
        <Route path="/chats" element={
          <MainProvider>
            <Chat/>
          </MainProvider>
        } />
        <Route path="/chats/:chatId" element={
          <MainProvider>
            <Messages/>
          </MainProvider>
        } />

        

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
