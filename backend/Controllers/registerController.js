// Import Model
import { User } from "../Models/userModel.js";

export const registerUser = async (req, res) => {
    try{  
        const user = new User(req.body);
        const response = await user.save();
        console.log('user saved')
        res.status(201).json('helloHEELLLOOO');
        
    } catch(err) {
        console.log('catch::', err)
        res.status(500).json(err.message);
      }
}