import {useState} from "react"
import {useNavigate} from 'react-router-dom';

// Components
import Navigation from "./Navigation.jsx";


// Toastify
import { toast } from 'react-toastify';

// Axios speciale
import API from '../../api.js';
import URL from '../board/Header';

// Styles
import '../../Styles/components/headerStyles.css';

const Header = ({data}) => {


  return (
    <>
    <div className='header-container'>
    <h2>welcome, {data.userName}</h2>
    <Navigation />



    </div>
    
    </>
  )
}

export default Header