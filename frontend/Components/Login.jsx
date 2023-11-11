import { useState } from 'react';
// MUI
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// Toastify
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
const [loginData, setLoginData] = useState({
    email: '',
    password: ''
})

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const submitHandler = (e) => {
    e.preventDefault();
    const emailRgx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!loginData.email && !loginData.password) {
        return toast.warning('Please enter email & password!!');
    }
    if (!loginData.email) {
        return    toast.warning('Please enter an email!!');
    } else {
        if (!emailRgx.test(loginData.email)) {
           return toast.error('Please enter a valid email')
        }
        if (!loginData.password) {
            return    toast.warning('Please enter a password!!');
        }
      }
    // navigate
    return alert('inputs passed => next navigate...');
    } 

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
    <h3>Login</h3>
    <ThemeProvider theme={darkTheme}>
    <Paper elevation={8} style={{padding: 48}}>
            <form onSubmit={submitHandler}>
        <Grid container rowSpacing={4} columnSpacing={{xs: 1, sm: 2, md:3}}>
            <Grid item xs={6}>
                <TextField id="outlined-basic" label="Email" variant="outlined" InputLabelProps={{ style: { color: 'orange' } }} inputProps={{ style: { color: "white" } }} onChange={(e) => {
                    setLoginData({
                        ...loginData,
                        email: e.target.value
                    })
                }}/>
            </Grid>
            <Grid item xs={6}>
                <TextField id="outlined-basic" label="Password" variant="outlined" InputLabelProps={{ style: { color: 'orange' } }} inputProps={{ style: { color: "white" } }} onChange={(e) => {
                    setLoginData({
                        ...loginData,
                        password: e.target.value
                    })
                }}/>
            </Grid>
            <Grid item xs={6}>
            <Button variant="contained" type='submit' onClick={submitHandler}>Submit</Button>
            </Grid>
    </Grid>
            </form>
    </Paper>
    </ThemeProvider>
    </>
  )
}

export default Login