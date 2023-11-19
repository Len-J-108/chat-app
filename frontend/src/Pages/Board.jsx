import { useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';

// Axios speciale
import API from '../api.js';
import URL from '../localhost.js';


// Toastify
import { toast } from 'react-toastify';

// Components
import UserList from '../Components/UserList.jsx';
import Header from '../Components/board/Header.jsx';

const Board = () => {
const [currentUser, setCurrentUser] = useState(null);  

  const navigate = useNavigate();

  const fetchForAuth = async () => {
    const authResponse = await API.get(`${URL}/user/private`);
    if (authResponse.status == 200) {
      return;
    } else {
      navigate("/");
    }
  }
  const fetchUserData = async () => {
    try{
      const response = await API.get(`${URL}/user/get-user-data`)
      const userData = await response.data;
      return setCurrentUser(userData);
    } catch(err) {
        console.error(err);
      }
    
  }

    // useEffect => check if JWT is in Cookies and verifies => setIsAuth(true)
    useEffect(() => {
       fetchForAuth();
       fetchUserData();
    }, [])

  return (
    <>
    <Header userData={currentUser} />

    <div>This is Board</div>
    <UserList />
    </>
  )
}

export default Board