// Import express router
import {Router} from 'express';

// import Controllers
import * as loginController from '../Controllers/loginController.js'
import { emailSchema, validateEmail } from '../Controllers/registerController.js';

const loginRouter = Router();

loginRouter
  .post("/", emailSchema, validateEmail, loginController.userLogin);

export default loginRouter;

