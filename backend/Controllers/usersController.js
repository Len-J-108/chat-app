// Import Model
import { User } from '../Models/userModel.js'; // UserModel

export const getAll = async (req, res) => {
    try{
        const allUsers = await User.find();
        if (allUsers){
            res.status(201).json(allUsers);
        }
    } catch(err) {
        res.status(500).send('error in getAll')
      }
}