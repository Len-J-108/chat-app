// Import Components
import Login from './Components/Login'
import Register from './Components/Register';

// import ToastContainer for error messages
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
      <div>Chat App</div>
      <Login />
      <Register />
    </>
  )
}

export default App
