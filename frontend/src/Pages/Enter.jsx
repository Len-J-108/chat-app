import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

import Login from '../Components/Login'
import Register from '../Components/Register';

import "react-toastify/dist/ReactToastify.css";

// Axios speciale
import API from '../api.js';

import URL from '../localhost.js';


const Enter = () => {
  const navigate = useNavigate();
  // useEffect => check if JWT is in Cookies and verifies => setIsAuth(true)
  useEffect(() => {
    const fetchIt = async () => {
        // const serverUrl = 'http://localhost:4321';
        const authResponse = await API.get(`${URL}/login/private`);
        if (authResponse.status == 200) {
            //User Authenticated set isAuth to true & navigate or history to chat page...
            navigate("/chat");
        }
     }
     fetchIt()
  }, [])

  return (
    <>
      <Login />
      <Register />
    </>
  )
}

export default Enter