import {useState} from "react"
import {useNavigate} from 'react-router-dom';

// Styles
import '../../Styles/components/navigationStyles.css';

// MUI Components
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Axios speciale
import API from '../../api.js';
import URL from '../board/Header';

// Toastify
import { toast } from 'react-toastify';

const Navigation = () => {

  const navigate = useNavigate();

  const logoutHandler = ( ) => {
    API.get("/user/logout")
      .then(res => res.data)
      .then(data => {
        toast.success(data);
        navigate("/");
      })

  }

  return (
    <div className='nav-container'>
      <h2>Profile</h2>
      <h2>Chat</h2>
      <IconButton aria-label="delete" color="warning" onClick={logoutHandler}>
          <DeleteIcon /> Logout
      </IconButton>
    </div>
  )
}

export default Navigation