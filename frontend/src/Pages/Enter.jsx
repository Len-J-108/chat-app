// React
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

// Components
import Login from '../Components/Login'
import Register from '../Components/Register';

// MUI
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

// Styles
import '../Styles/Pages/enterStyles.css';

// Toastify
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Axios speciale
import API from '../api.js';
import URL from '../localhost.js';


const Enter = () => {

  const darkTheme = createTheme({ palette: { mode: 'dark' } });
  const lightTheme = createTheme({ palette: { mode: 'light' } });

      const buttonTheme = createTheme({
        palette: {
          on: {
            main: '#16a34a',
          },
          off: {
            main: '#a8a29e',
          },
        },
      });

  const [toggle, setToggle] = useState(true)
  const navigate = useNavigate();

  const lgnClickHandler = (e) => {
    e.preventDefault();
    setToggle(true)
  }
  const rgstrClickHandler = (e) => {
    e.preventDefault();
    setToggle(false)
  }

  // useEffect => check if JWT is in Cookies and verifies => setIsAuth(true)
  useEffect(() => {
    const fetchIt = async () => {
        const authResponse = await API.get(`${URL}/user/private`);
        if (authResponse.status == 200) {
            //User Authenticated set isAuth to true & navigate or history to chat page...
            navigate("/board");
        }
     }
     fetchIt()
  }, [])

  return (
    <>
    <ThemeProvider theme={darkTheme}>
    <Paper elevation={8} style={{padding: 48}} className='enter-container'>
    <div>
      <ThemeProvider theme={buttonTheme}>
      <div className='btn-container'>
        <Button variant="outlined" color={toggle ? "on" : "off"} onClick={lgnClickHandler}>Login</Button>
        <Button variant="outlined" color={!toggle ? "on" : "off"} onClick={rgstrClickHandler}>Register</Button>
      </div>
      </ThemeProvider>
    </div>
      {toggle && <Login />}
      {!toggle && <Register /> }
    </Paper>
    </ThemeProvider>
    </>
  )
}

export default Enter