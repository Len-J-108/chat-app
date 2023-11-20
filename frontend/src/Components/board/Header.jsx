import {useState} from "react"
import {useNavigate} from 'react-router-dom';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Toastify
import { toast } from 'react-toastify';

// Axios speciale
import API from '../../api.js';
import URL from '../board/Header';

const Header = ({data}) => {
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
    <>
    <div>Header</div>
    <h3>welcome {data.userName}</h3>
    <IconButton aria-label="delete" color="warning" onClick={logoutHandler}>
  <DeleteIcon /> Logout
</IconButton>
    
    </>
  )
}

export default Header