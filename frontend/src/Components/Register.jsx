import { useState } from 'react';
// MUI
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// Toastify
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
  const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
  // Themes
  const darkTheme = createTheme({ palette: { mode: 'dark' } });
  const lightTheme = createTheme({ palette: { mode: 'light' } });


  const submitHandler = (e) => {
    e.preventDefault();

    const emailRgx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; // tests for email addresses

    const firstName = registerData.firstName.trim();
    const lastName = registerData.lastName.trim();
    const email = registerData.email.trim();
    const password = registerData.password;

    if (!firstName || !lastName || !email || !password) {
        return toast.warning('Please fill out every required field!');
    } 
    if (!emailRgx.test(email)) {
        return toast.error('Please enter a valid email')
    }
    if (password.length < 10 || password.length > 100) {
        return toast.error('The password must be between 10 & 100 characters long');
    }
    // Past ClientSide Validation
    const form = new FormData(); // create FormData class
    for (let item in registerData) {
        form.append(item, registerData[item]);
    }

    console.log({form})
    const url = `http://localhost:4321/register`;
    // fetch(url, {
    //     method: 'POST',
    //     body: form,
    // })
    // .then((response) => response.json())
    // .then(data => console.log({data}))

    // alert('register submitted')
  };

  return (
    <>
        <h3>--Register--</h3>
    <ThemeProvider theme={darkTheme}>
    <Paper elevation={8} style={{padding: 48}}>
            <form onSubmit={submitHandler}>
        <Grid container rowSpacing={4} columnSpacing={{xs: 1, sm: 2, md:3}}>
            <Grid item xs={6}>
                <TextField 
                id="outlined-basic"
                label="First Name" 
                variant="outlined" 
                InputLabelProps={{ style: { color: 'orange' } }} 
                inputProps={{ style: { color: "white" } }}
                onChange={(e) => {
                    setRegisterData({
                        ...registerData, 
                        firstName: e.target.value
                    })
                }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                id="outlined-basic" 
                label="Last Name" 
                variant="outlined" 
                InputLabelProps={{ style: { color: 'orange' } }} 
                inputProps={{ style: { color: "white" } }}
                onChange={(e) => {
                    setRegisterData({
                        ...registerData, 
                        lastName: e.target.value
                    })
                }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                id="outlined-basic" 
                label="Email" 
                variant="outlined" 
                InputLabelProps={{ style: { color: 'orange' } }} 
                inputProps={{ style: { color: "white" } }} 
                onChange={(e) => {
                    setRegisterData({
                        ...registerData, 
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
                    setRegisterData({
                        ...registerData, 
                        password: e.target.value
                    })
                }}
                />
            </Grid>
            <Grid item xs={6}>
            <Button variant="contained" type='submit' onClick={submitHandler}>Register</Button>
            </Grid>
    </Grid>
            </form>
    </Paper>
    </ThemeProvider>
    </>
  )
}

export default Register