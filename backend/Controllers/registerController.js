// Import Model
import { User } from "../Models/userModel.js";

// Import Validator (for email)
import validator from 'express-validator';
import {validationResult} from 'express-validator';

// import token functions
import { createJWT } from "../utils/token.js";

//------------------------------------------------------------------------------------
// check if email is valid with express validator

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
//------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------
//If Email is valid --> register user
export const registerUser = async (req, res) => {
    console.log('Inside registerUser')
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
//------------------------------------------------------------------------------------