import {useContext} from "react"
import {useNavigate} from 'react-router-dom';

// Context
import dataContext from "../../Context/AppContext.jsx";

// Components
import Navigation from "./Navigation.jsx";


// Toastify
import { toast } from 'react-toastify';

// Axios speciale
import API from '../../api.js';
import URL from '../board/Header';

// Styles
import '../../Styles/components/headerStyles.css';

const Header = () => {
  const {name} = useContext(dataContext)

  return (
    <>
    <div className='header-container'>
    <h2>welcome, {name}</h2>
    <Navigation />



    </div>
    
    </>
  )
}

export default Header