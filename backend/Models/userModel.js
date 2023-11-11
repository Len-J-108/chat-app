import mongoose from 'mongoose'

const userModel = mongoose.Schema({
    firstName: {type: String, trim: true, required: true},
    lastName:  {type: String, trim: true, required: true},
    email: {type: String, trim: true, required: true, unique: true},
}, {timestamps: true});

export const User = mongoose.model("User", userModel);