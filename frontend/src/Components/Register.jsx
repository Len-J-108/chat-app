// React Imports
import { useState } from 'react';

// CSS Import (as module)
import * as styles from '../Styles/Register.module.css';

// MUI
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// Toastify
import { toast } from 'react-toastify';

//useForm Hook
import {useForm} from 'react-hook-form';

// Yup
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';


const Register = () => {

// Themes
    const darkTheme = createTheme({ palette: { mode: 'dark' } });
    const lightTheme = createTheme({ palette: { mode: 'light' } });

    const regSchema = yup.object().shape({
        userName: yup.string().min(3, 'username must be at least 3 characters long').required('A username is required'),
        email: yup.string()/* .email('enter valid email-address') */.required('An email-address is required'),
        password: yup.string().min(8, 'password must be at least 8 characters long').required('please choose a password')
        
    })
    
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(regSchema),
      });
    
      const handleForm = async (data) => {
        const serverUrl = 'http://localhost:4321';
        const route = '/register';
    
        // fetching
            const response = await fetch(`${serverUrl}${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const xx = await response.json();
            console.log(xx);
            toast.warning(xx);
        }
    

    
    return (
        <>
        <h3>--Register--</h3>
    <ThemeProvider theme={darkTheme}>
    <Paper elevation={8} style={{padding: 48}}>
            <form className={styles.formContainer} onSubmit={handleSubmit(handleForm)}>
                <TextField 
                error={errors.userName}
                helperText={errors?.userName?.message}
                id="outlined-basic"
                label="User Name" 
                variant="outlined" 
                InputLabelProps={{ style: { color: 'orange' } }} 
                inputProps={{ style: { color: "white" } }}
                {...register("userName")}
                />
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
            <Button   /* disabled={!isValid} */  variant="contained" type='submit' >Register</Button>
            </form>
    </Paper>
    </ThemeProvider>
    </>
  )
}

export default Register