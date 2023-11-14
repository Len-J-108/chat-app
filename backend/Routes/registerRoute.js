// Import Router
import {Router} from 'express';

// Import Controllers
import * as registerController from '../Controllers/registerController.js';

const registerRouter = Router();

registerRouter
  .post("/", registerController.registerUser);



export default registerRouter;