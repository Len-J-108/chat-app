import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

// CSS Import (as module)
import * as styles from '../Styles/Register.module.css';

// MUI
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// useForm Hook
import {useForm} from 'react-hook-form';

// Toastify
import { toast } from 'react-toastify';

// Yup
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

// Axios speciale
import API from '../api.js';
import URL from '../localhost.js';


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

  // const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

const handleForm = async (data) => {

    // Authorisation
    // fetching Login Route
    try{
        const response = await API.post(`${URL}/user/login`, data);
        // if (!response.ok) {
            //     return console.log('response not OK...');
            // }
            const xx = await response.data;
            console.log({xx});
            toast.warning(xx);
          } catch(err) {
            return console.error(err);
          }
          // Authentication
          // Fetching login/private route
          try{
            const authResponse = await API.get(`${URL}/user/private`);
            const data = await authResponse.data;
            if (authResponse.status == 200) {
                //User Authenticated set isAuth to true & navigate or history to chat page...
                toast.success(data)
                navigate("/chat");
            }
    } catch(err) {
        console.error(err);
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
                // value='one@example.com'
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
                // value='qweqweqweqwe'
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