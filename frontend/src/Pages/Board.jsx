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

    // useEffect => check if JWT is in Cookies and verifies => setIsAuth(true)
    useEffect(() => {
      API.get(`${URL}/user/get-user-data`)
        .then((response) =>  response.data)
        .then(data => {
          console.log(data);
          setCurrentUserData(data);
        })
          
        .catch(() => navigate("/"))
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