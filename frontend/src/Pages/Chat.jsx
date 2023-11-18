import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

// Axios speciale
import API from '../api.js';

// Toastify
import { toast } from 'react-toastify';

const Chat = () => {

  const navigate = useNavigate();

    // useEffect => check if JWT is in Cookies and verifies => setIsAuth(true)
    useEffect(() => {
      const fetchIt = async () => {
          const serverUrl = 'http://localhost:4321';
          const authResponse = await API.get(`${serverUrl}/login/private`);
          if (authResponse.status == 200) {
            return;
          } else {
            navigate("/");
          }
       }
       fetchIt()
    }, [])
  


 




  return (
    <div>This is Chat</div>
  )
}

export default Chat