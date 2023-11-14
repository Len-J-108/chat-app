import { useState } from 'react';

// CSS Import (as module)
import * as styles from '../Styles/Register.module.css';

// MUI
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

//useForm Hook
import {useForm} from 'react-hook-form';

// Toastify
import { toast } from 'react-toastify';


// Yup
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';


const Login = () => {

    const logSchema = yup.object().shape({
        email: yup.string().email('enter valid email-address').required('An email-address is required'),
        password: yup.string().min(8, 'password must be at least 8 characters long').required('please enter your password')
    })

// Themes
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    resolver: yupResolver(logSchema),
});

const handleForm = async (data) => {
    const serverUrl = 'http://localhost:4321';
    const route = '/login';

    // fetching
    try {
        const response = await fetch(`${serverUrl}${route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to log in');
        }
        console.log('Logged in successfully');
        // toast.success('Logged in successfully');
    } catch (err) {
        // Handle any errors that occurred during the fetch
        console.error('Error:', err.message);
        // toast.error('Failed to log in');
    }
};

  return (
    <>
    <h3>--Login--</h3>
    <ThemeProvider theme={darkTheme}>
    <Paper elevation={8} style={{padding: 48}}>
            <form className={styles.formContainer} onSubmit={handleSubmit(handleForm)}>
                <TextField 
                error={errors.email}
                helperText={errors?.email?.message}
                id="outlined-basic" 
                label="Email" 
                variant="outlined" 
                InputLabelProps={{ style: { color: 'orange' } }} 
                inputProps={{ style: { color: "white" } }} 
                {...register("email")}
                />
                <TextField 
                error={errors.password}
                helperText={errors?.password?.message}
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                InputLabelProps={{ style: { color: 'orange' } }} 
                inputProps={{ style: { color: "white" } }} 
                {...register("password")}
                />
            <Button disabled={!isValid} variant="contained" type='submit' >Enter</Button>
            </form>
    </Paper>
    </ThemeProvider>
    </>
  )
}

export default Login