// Import express router
import {Router} from 'express';

import * as UC from '../Controllers/userController.js';

const userRouter = Router();

userRouter
.post("/login", UC.emailSchema, UC.validateEmail, UC.userLogin)
.post("register", UC.emailSchema, UC.validateEmail, UC.checkNewEmail, UC.registerUser )
.get("/private", UC.userAuthentication)

export default userRouter;