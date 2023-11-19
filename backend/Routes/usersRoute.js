// Import express router
import {Router} from 'express';
import * as UCX from '../Controllers/usersController.js';

const usersRouter = Router();

usersRouter
.get("/get-all", UCX.getAllUsers)

export default usersRouter;