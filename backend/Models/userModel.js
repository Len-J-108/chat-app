// Imports
import mongoose from 'mongoose'
import bcrypt from 'bcrypt';


const userModel = mongoose.Schema({
    userName: {
        type: String, 
        trim: true, 
        minLength: [3, 'username needs to be at least 3 characters long...'],
        required: [true, 'a password is required...']
    },
    email: {
        type: String, 
        trim: true, 
        required: [true, 'an email is required...'],
        unique: [true, 'email already in use...']
    },
    password: {
        type: String,
        minLength: [10, 'password not less than 10 characters...'],
        required: [true, 'a password is required...'],
    }
}, {timestamps: true});

//Save Password as hash w.bcrypt
userModel.pre("save", async function(next) {
    console.log('inside PRE-SAVE')
    try{
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        return next();
    } catch(err) {
        return next(err);
      }
})

// Custom method to compare req pw with database pw
userModel.methods.authenticate = async function(password){
    return await bcrypt.compare(password, this.password);
}


// This prevents that the password gets send back to the clien by mistake
userModel.methods.toJSON = function(){
    const user = this.toObject();
    delete user.password;
    return user;
}

export const User = mongoose.model("User", userModel);