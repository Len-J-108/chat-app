// React Imports
import { useState } from 'react';

// CSS Import (as module)
import * as styles from '../Styles/Register.module.css';

// MUI
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Axios
import  API from '../api.js';
import URL from '../localhost.js';


// Toastify
import { toast } from 'react-toastify';

//useForm Hook
import {useForm} from 'react-hook-form';

// Yup
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';


const Register = () => {



    const regSchema = yup.object().shape({
        username: yup.string().min(3, 'username must be at least 3 characters long').required('A username is required'),
        email: yup.string().email('enter valid email-address').required('An email-address is required'),
        password: yup.string().min(8, 'password must be at least 8 characters long').required('please choose a password')
        
    })
    
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(regSchema),
      });
    
      const handleForm = async (data) => {
    
        // fetching
        try{
            const response = await API.post(`${URL}/user/register`, data, {
            })
            const resData = await response.data;
            console.log(resData);
            if (resData === 'Registered successful') {
                toast.success(resData);
                reset();
                return;
            }
            toast.warning(resData)
        } catch(err) {
            console.error(err);
        }
    }
    

    
    return (
        <>
        <h3>Register</h3>
            <form className={styles.formContainer} onSubmit={handleSubmit(handleForm)}>
                <TextField 
                error={errors.username}
                helperText={errors?.username?.message}
                id="outlined-basic"
                label="User Name" 
                variant="outlined" 
                InputLabelProps={{ style: { color: 'orange' } }} 
                inputProps={{ style: { color: "white" } }}
                {...register("username")}
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
            <Button disabled={!isValid}  variant="contained" type='submit' >Register</Button>
            </form>
    </>
  )
}

export default Register