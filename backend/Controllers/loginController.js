// MongoDB Connection
import '../utils/mongodb.js';

// Import Model
import { User } from '../Models/userModel.js';

export const userLookup = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            console.log('unknown user');
            return res.status(404).json('unknown user');
        } else {
            const checkPW = await user.authenticate(req.body.password);
            console.log({checkPW});
            if (checkPW) return res.status(200).json('Passed Login!!');//user
            return res.status(401).json("the data is wrong")
        }

        
    } catch(err) {
        // console.error(err);
        res.status(500).json(err.message);
      }

}