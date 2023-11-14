// MongoDB Connection
import '../utils/mongodb.js';

// Import Model
import { User } from '../Models/userModel.js';

export const validateEmail = async (req, res, next) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email: email});
        if (!user) {
            throw new Error('could not find user in db...');
        }
        res.status(200).json('email validated in Controller...');
        //next();

        
    } catch(err) {
        // console.error(err);
        res.status(500).send(err.message);
      }

}