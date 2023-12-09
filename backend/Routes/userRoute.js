// Import express router
import {Router} from 'express';

import * as UC from '../Controllers/userController.js';

const userRouter = Router();

userRouter
.post("/login", UC.emailSchema, UC.validateEmail, UC.userLogin)
.post("/register", UC.emailSchema, UC.validateEmail, UC.checkNewEmail, UC.registerUser )
.get("/private", UC.userAuthentication, (req, res) => res.status(200).json('all good'))
.get("/get-user-data",UC.userAuthentication, UC.getUserData)
.get("/logout", UC.logout)

export default userRouter;