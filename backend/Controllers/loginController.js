// Imports
import '../utils/mongodb.js'; // MongoDB Connection
import { User } from '../Models/userModel.js'; // UserModel
// import cookieParser from 'cookie-parser';
// https://medium.com/@ethantcollins98/setting-and-using-cookies-with-a-node-js-express-server-49479673d043

// import token functions
import { createJWT } from "../utils/token.js";

export const userLookup = async (req, res, next) => {
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
            console.log(`passwords match: ${checkPW}`);
            if (checkPW) {
                res.cookie("test", "ok", {maxAge: 24 * 60 * 60 * 1000, httpOnly:true})
                return res.status(200).json({ // Passed Login
                    _id: user._id,
                    userName: user.userName,
                    email: user.email,
                    token: createJWT({token: user._id})
                }); 
            } 
            return res.status(401).json("the data is wrong")
        }
    } catch(err) {
        console.error(err);
        res.status(500).json(err.message);
      }
}