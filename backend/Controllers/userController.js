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
            console.log('next');
            return next();
        }
        console.log(`User: ${email} already exists`);
        res.status(409).json(`User: ${email} already exists`);
    } catch(err) {
        console.error(err);
      }
}

//If Email is valid --> register user
export const registerUser = async (req, res) => {
    try{  
        const {email} = req.body;
        const user = new User(req.body);
        const response = await user.save();
        console.log('user saved')
        if (user) {
            res.status(201).json({
                _id: user.id,
                userName: user.userName,
                password: user.password,
                token: createJWT({token: user._id}) 
            });
        }
    } catch(err) {
        if (err.errors){
            // console.log('here', err.errors);
            const validationErrors = Object.values(err.errors).map((e) => e.message);
            console.error(`Validation Errors: ${validationErrors}`);
            res.status(400).json(validationErrors);
        }
        console.log('no validation errors');
        res.end();
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
                const token = createJWT({userID: user._id}); // create accessToken
                return res
                .cookie("accessToken", token, {maxAge: 24 * 60 * 60 * 1000, httpOnly:true}) // send accessToken with Cookie
                .cookie("username", user.userName, {maxAge: 24 * 60 * 60 * 1000, httpOnly:true})
                .cookie("email", user.email, {maxAge: 24 * 60 * 60 * 1000, httpOnly:true})
                .status(200)
                .json('Authorisation Success!');      
            } 
            return res.status(209).json("the data is wrong")
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
            console.log('here')
            return res.status(204).json('Authentication Denied');
        }
        const isUserAccessGranted = verifyJWT(accessToken);
        res.status(200).json('Authentication Success');
    } catch(err) {
        console.error(err);
        req.status(500).json(err.message);
      }
}

export const getUserData = async (req, res) => {
    try{
        const {username, email, accessToken} = req.cookies;
        const user = await User.findOne({email: email})
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json('error inside userController -> getUserData')
      }
}

