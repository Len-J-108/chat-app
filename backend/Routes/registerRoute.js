// Import Router
import {Router} from 'express';

// Import Controllers
import * as registerController from '../Controllers/registerController.js';

const registerRouter = Router();

registerRouter
  .post("/", registerController.emailSchema, registerController.validateEmail, registerController.checkNewEmail, registerController.registerUser);



export default registerRouter;