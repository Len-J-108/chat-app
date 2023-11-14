// Import express router
import {Router} from 'express';

// import Controllers
import * as loginController from '../Controllers/loginController.js'

const loginRouter = Router();

loginRouter
  .post("/", loginController.validateEmail);

export default loginRouter;

