import {Routes,  Route } from 'react-router-dom';
// import { Navigate } from "react-router-dom";
// import { useEffect } from 'react';
// import routes from '../routes';

// Import Components
import Enter from './Pages/Enter';
import Chat from './Pages/Chat';

// import ToastContainer for error messages
import { ToastContainer } from 'react-toastify';


import './App.css'

function App() {


  return (
    <>
        <ToastContainer
    position="top-center"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    /> 
      <Routes>
        <Route path="/" element={<Enter />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  )
}

export default App
