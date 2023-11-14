import mongoose from 'mongoose'

const userModel = mongoose.Schema({
    userName: {
        type: [String, 'username needs to be a string...'], 
        trim: true, 
        minLength: [3, 'username needs to be at least 3 characters long...'],
        required: [true, 'a password is required...']
    },
    email: {
        type: [String, 'email needs to be a string...'], 
        trim: true, 
        required: [true, 'an email is required...'],
        unique: [true, 'email already in use...']
    },
    password: {
        type: [String, 'password needs to be a string'], 
        minLength: [10, 'password not less than 10 characters...'],
        required: [true, 'a password is required...'],
    }
}, {timestamps: true});

export const User = mongoose.model("User", userModel);