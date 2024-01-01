// Import express router
import {Router} from 'express';

import * as UC from '../Controllers/userController.js';
import { auth } from '../Middleware/auth.js';

const userRouter = Router();

userRouter
.get("/", auth, UC.searchUsers)
.post("/login", UC.emailSchema, UC.validateEmail, UC.userLogin)
.post("/register", UC.emailSchema, UC.validateEmail, UC.checkNewEmail, UC.registerUser )
.get("/private", auth, (req, res) => res.status(200).json('all good'))
.get("/get-user-data",auth, UC.getUserData)
.get("/logout", UC.logout)

export default userRouter;