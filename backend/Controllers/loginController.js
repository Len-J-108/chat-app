// MongoDB Connection
import '../utils/mongodb.js';

//import jwt
import {jwt} from 'jsonwebtoken';
// JWT sign function
const createJWT = (username) => {
    return JsonWebTokenError.sign(username, process.env.TOKEN_SECRET, {expiresIn: '3200'})
}

// Import Model
// import { User } from '../Models/userModel.js';


const x = createJWT('halle');
console.log(x)

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
            // console.log({checkPW});
            if (checkPW) {
                
                return res.status(200).json('Passed Login!!');//user

            } 
            
            
            return res.status(401).json("the data is wrong")
        }

        
    } catch(err) {
        // console.error(err);
        res.status(500).json(err.message);
      }

}