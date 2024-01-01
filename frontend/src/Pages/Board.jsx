import { useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

// Axios speciale
import API from '../api.js';
import URL from '../localhost.js';

// Context
import dataContext from '../Context/AppContext.jsx';

// Toastify
import { toast } from 'react-toastify';

// Styles
import '../Styles/Pages/boardStyles.css';

// Components
import Header from '../Components/board/Header.jsx';

const Board = () => {
  // from AppContext
  const {name, setName, isAdmin, setIsAdmin} = useContext(dataContext)
  

  const navigate = useNavigate();

    // useEffect => check if JWT is in Cookies and verifies => setIsAuth(true)
    useEffect(() => {
      API.get(`${URL}/user/get-user-data`)
        .then((response) =>  response.data)
        .then(data => {
          console.log(data);
          setName(data.username);
          setIsAdmin(data.isAdmin);
        })
          
        .catch(() => navigate("/"))
    }, [])

  return (
    <>
    <div className='board-container'>
    {name && <Header />}
    {!isAdmin && <p>not admin</p>}
    {isAdmin && <p>yes admin</p>}
    </div>
    </>
  )
}

export default Board