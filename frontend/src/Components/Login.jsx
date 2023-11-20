import {useNavigate} from 'react-router-dom';

// CSS Import (as module)
import * as styles from '../Styles/Register.module.css';

// MUI
import TextField from '@mui/material/TextField';
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

  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    resolver: yupResolver(logSchema),
  });

  const navigate = useNavigate();

const handleForm = async (data) => {

    // Authorisation
    // fetching Login Route
    try{
        const response = await API.post(`${URL}/user/login`, data);
            const resData = await response.data;
            console.log(resData);
            // toast.success('Login successful')
            if (resData === 'unknown user') return toast.warning(resData);
           toast.warning(resData);
            navigate("/board");
          } catch(err) {
            return console.error(err);
          }
          // Authentication
          // Fetching login/private route
    //       try{
    //         const authResponse = await API.get(`${URL}/user/private`);
    //         // const resData = await authResponse.data;
    //         if (authResponse.status == 200) {
    //             //User Authenticated set isAuth to true & navigate or history to chat page...
    //             toast.success('Login successful')
    //             navigate("/board");
    //         }
    // } catch(err) {
    //     console.error(err);
    //   }
};

  return (
    <>
    <h3>Login</h3>
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
    </>
  )
}

export default Login