import { useState } from 'react';
// MUI
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// Toastify
import { toast } from 'react-toastify';


const Login = () => {
const [loginData, setLoginData] = useState({
    email: '',
    password: ''
})

// Themes
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const submitHandler = (e) => {
    e.preventDefault();
    const emailRgx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; // tests for email addresses
    const email = loginData.email.trim(); // trims potential whitespaces before & after
    if (!email && !loginData.password) {
        return toast.warning('Please enter email & password!!');
    }
    if (!email) {
        return    toast.warning('Please enter an email!!');
    } else {
        if (!emailRgx.test(email)) {
           return toast.error('Please enter a valid email')
        }
        if (!loginData.password) {
            return    toast.warning('Please enter a password!!');
        }
      }
    if (loginData.password.length < 10 || loginData.password.length > 100) {
        return toast.warning('The password must be between 10 & 100 characters long')
    }
    // Past ClientSide Validation
    // navigate
    return alert('inputs passed => next navigate...');
    } 

  return (
    <>
    <h3>--Login--</h3>
    <ThemeProvider theme={darkTheme}>
    <Paper elevation={8} style={{padding: 48}}>
            <form onSubmit={submitHandler}>
        <Grid container rowSpacing={4} columnSpacing={{xs: 1, sm: 2, md:3}}>
            <Grid item xs={6}>
                <TextField 
                id="outlined-basic" 
                label="Email" 
                variant="outlined" 
                InputLabelProps={{ style: { color: 'orange' } }} 
                inputProps={{ style: { color: "white" } }} 
                onChange={(e) => {
                    setLoginData({
                        ...loginData,
                        email: e.target.value
                    })
                }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                InputLabelProps={{ style: { color: 'orange' } }} 
                inputProps={{ style: { color: "white" } }} 
                onChange={(e) => {
                    setLoginData({
                        ...loginData,
                        password: e.target.value
                    })
                }}
                />
            </Grid>
            <Grid item xs={6}>
            <Button variant="contained" type='submit' onClick={submitHandler}>Enter</Button>
            </Grid>
    </Grid>
            </form>
    </Paper>
    </ThemeProvider>
    </>
  )
}

export default Login