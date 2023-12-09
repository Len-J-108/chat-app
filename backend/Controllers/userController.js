// Imports
// import '../utils/mongodb.js'; // MongoDB Connection

// Import Model
import { User } from '../Models/userModel.js'; // UserModel

import jwt from 'jsonwebtoken';

// Import Validator (for email)
import validator from 'express-validator';
import {validationResult} from 'express-validator';

// import token functions
import { createJWT, verifyJWT } from "../utils/token.js";

// Email-Validation Schema
export const emailSchema = [validator.body("email").isEmail().withMessage("invalid email").normalizeEmail()]


// Email Validation Result
export const validateEmail = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()){
        next()
    } else {
        console.log(errors.array()[0].msg)
        res.status(400).json(errors.array()[0].msg);
    }
}

// Check if email is already id database
export const checkNewEmail = async (req, res, next) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email: email});
        if (!user) {
            console.log(`User: ${email} is new`);
            return next();
        }
        console.log(`User: ${email} already exists`);
        // res.status(204).json(`User: ${email} already exists`);
        res.status(209).json(`User: already exists`);
    } catch(err) {
        console.error(err);
    }
}

//If Email is valid --> register user
export const registerUser = async (req, res) => {
    try{  
        const user = new User(req.body);
        const response = await user.save();
        console.log('user saved')
        res.status(200).send('Registered successful')
        
    } catch(err) {
        if (err.errors){
            const validationErrors = Object.values(err.errors).map((e) => e.message);
            console.error(`Validation Errors: ${validationErrors}`);
            res.status(400).json(validationErrors);
        }
        console.log('no validation errors');
        res.status(400).json('something went wrong in register');
      }
}

export const userLogin = async (req, res, next) => {
    try{
        // lookUp
        const user = await User.findOne({email: req.body.email});
        console.log({user})
        // if email is NOT in db
        if (!user) {
            console.log('unknown user');
             res.status(209).json('unknown user');
        // if email IS in db
        } else {
            const checkPW = await user.authenticate(req.body.password); // check if passwords match
            console.log(`passwords match: ${checkPW}`); // Logs match
            if (checkPW) {
                const token = createJWT({ // create accessToken
                    userID: user._id,
                }); 
                // const cookieLifeDuration = 24 * 60 * 60 * 1000; // 24 hours
                const cookieLifeDuration = 60 * 60 * 1000; // 24 hours
                // const cookieLifeDuration = 5 * 1000; // 5seconds
                return res
                .cookie("accessToken", token, {maxAge: cookieLifeDuration, httpOnly:true}) // send accessToken with Cookie
                .status(200)
                .json('user authorised');      
            } 
            return res.status(209).json("the data is wrong")
        }
    } catch(err) {
        console.error(err);
        res.status(500).json(err.message);
      }
}

export const userAuthentication = async (req, res, next) => {
    try{
        const {accessToken} = req.cookies;
        const decoded = verifyJWT(accessToken);
        if (!decoded) { throw new Error('not granted');}
        req.id = decoded.id // send id as req parameter to next middleware
        next();
    } catch(err) {
        res.status(500).json(err.message);
      }
}

export const getUserData = async (req, res) => {
    try{
        const {id} = req;
        const user = await User.findOne({id})
        if (!user) throw new Error('something went wrong');
        const resData = {
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        }
        res.status(200).json(resData)
    } catch(err) {
        res.status(500).json('error inside userController -> getUserData')
      }
}

export const logout = async (req, res) => {
    res
     .clearCookie("accessToken")
     .clearCookie("username")
     .clearCookie("email")
     .status(200)
     .send('Logged out!')
}
