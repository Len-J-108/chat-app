// Imports
import '../utils/mongodb.js'; // MongoDB Connection
import { User } from '../Models/userModel.js'; // UserModel

import jwt from 'jsonwebtoken';



// import token functions
import { createJWT, verifyJWT } from "../utils/token.js";

export const userLogin = async (req, res, next) => {
    try{
        // lookUp
        const user = await User.findOne({email: req.body.email});
        console.log({user})
        // if email is NOT in db
        if (!user) {
            console.log('unknown user');
            return res.status(404).json('unknown user');
            //  throw new Error('unknown user');
        // if email IS in db
        } else {
            const checkPW = await user.authenticate(req.body.password); // check if passwords match
            console.log(`passwords match: ${checkPW}`); // Logs match
            if (checkPW) {
                // const token = createJWT({userID: user._id}); // create accessToken
                const token = createJWT({txt: 'JO ALTER'}); // create accessToken
                return res
                .cookie("accessToken", token, {maxAge: 24 * 60 * 60 * 1000, httpOnly:true}) // send accessToken with Cookie
                .cookie("username", user.userName, {maxAge: 24 * 60 * 60 * 1000, httpOnly:true})
                .cookie("email", user.email, {maxAge: 24 * 60 * 60 * 1000, httpOnly:true})
                .status(200)
                .json('Authorisation Success!');      
            } 
            return res.status(401).json("the data is wrong")
        }
    } catch(err) {
        console.error(err);
        res.status(500).json(err.message);
      }
}

export const userAuthentication = async (req, res) => {
    try{
        const {username, email, accessToken} = req.cookies;
        const user = await User.findOne({email: email})
        if (!user) {
            return res.status(404).json('Authentication Denied');
        }
        const isUserAccessGranted = verifyJWT(accessToken);
        res.status(200).json('Authentication Success');
    } catch(err) {
        console.error(err);
        req.status(500).json(err.message);
      }
}