import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

import Login from '../Components/Login'
import Register from '../Components/Register';

import "react-toastify/dist/ReactToastify.css";

// Axios speciale
import API from '../api.js';


const Enter = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  // useEffect => check if JWT is in Cookies and verifies => setIsAuth(true)
  useEffect(() => {
    const fetchIt = async () => {
      try{
        const serverUrl = 'http://localhost:4321';
        const authResponse = await API.get(`${serverUrl}/login/private`);
        // const data = await authResponse.data; // ?????
        if (authResponse.status == 200) {
            //User Authenticated set isAuth to true & navigate or history to chat page...
            setIsAuth(true);
        }
       } catch(err) {
         console.error(err);
       }
     }
     fetchIt()
  }, [])

  //use Effect  => if is authenticated => navigate to "chat"
  useEffect(() => {
    if (isAuth) navigate("/chat"); // navigate to provate area "chat"
    setIsAuth(false); // reset isAuth
  }, [isAuth])

  return (
    <>
      <Login />
      <Register />
    </>
  )
}

export default Enter