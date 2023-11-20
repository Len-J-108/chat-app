import { useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';

// Axios speciale
import API from '../api.js';
import URL from '../localhost.js';

// Toastify
import { toast } from 'react-toastify';

// Styles
import '../Styles/Pages/boardStyles.css';

// Components
import Header from '../Components/board/Header.jsx';

const Board = () => {
const [currentUserData, setCurrentUserData] = useState(null);

  const navigate = useNavigate();

  const fetchForAuth = async () => {
    const authResponse = await API.get(`${URL}/user/private`);
    if (authResponse.status == 200) {
      return;
    } else {
      navigate("/");
    }
  }

    // useEffect => check if JWT is in Cookies and verifies => setIsAuth(true)
    useEffect(() => {
       fetchForAuth();

       API.get(`${URL}/user/get-user-data`)
         .then(res => {
           return res;
         })
         .then(({data}) => {
          setCurrentUserData(data)
         })
    }, [])

  return (
    <>
    <div className='board-container'>
    {currentUserData && <Header data={currentUserData} />}
    </div>
    </>
  )
}

export default Board