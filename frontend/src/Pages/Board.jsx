import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

// Axios speciale
import API from '../api.js';
import URL from '../localhost.js';


// Toastify
import { toast } from 'react-toastify';

// Components
import UserList from '../Components/UserList.jsx';

const Chat = () => {

  const navigate = useNavigate();

    // useEffect => check if JWT is in Cookies and verifies => setIsAuth(true)
    useEffect(() => {
      const fetchIt = async () => {
          const authResponse = await API.get(`${URL}/user/private`);
          if (authResponse.status == 200) {
            return;
          } else {
            navigate("/");
          }
       }
       fetchIt()
    }, [])
  


 




  return (
    <>
    <div>This is Chat</div>
    <UserList />
    </>
  )
}

export default Chat