// Imports
import '../utils/mongodb.js'; // MongoDB Connection
import { User } from '../Models/userModel.js'; // UserModel
// import cookieParser from 'cookie-parser';
// https://medium.com/@ethantcollins98/setting-and-using-cookies-with-a-node-js-express-server-49479673d043
// https://www.bezkoder.com/react-login-example-jwt-hooks/
// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
// https://hashnode.com/post/how-to-build-your-first-mern-stack-app-with-cookies-driving-your-authentication-flow-ckw1or8et07umvzs15tqo819h

// import token functions
import { createJWT } from "../utils/token.js";

export const userLogin = async (req, res, next) => {
    try{
        // lookUp
        const user = await User.findOne({email: req.body.email});
        // if email is NOT in db
        if (!user) {
            console.log('unknown user');
            return res.status(404).json('unknown user');
        // if email IS in db
        } else {
            const checkPW = await user.authenticate(req.body.password); // check if passwords match
            console.log(`passwords match: ${checkPW}`); // Logs match
            if (checkPW) {
                const token = createJWT({userID: user._id}); // create accessToken
                return res
                .cookie("accessToken", token, {maxAge: 24 * 60 * 60 * 1000, httpOnly:true}) // send accessToken with Cookie
                .status(200)
                .json('Logged in successfully');      
            } 
            return res.status(401).json("the data is wrong")
        }
    } catch(err) {
        console.error(err);
        res.status(500).json(err.message);
      }
}