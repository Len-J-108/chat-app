import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

// Axios speciale
import API from '../api.js';

// Toastify
import { toast } from 'react-toastify';

const Chat = () => {

  const [isAuth, setIsAuth] = useState(false);
 const navigate = useNavigate();




  return (
    <div>This is Chat</div>
  )
}

export default Chat