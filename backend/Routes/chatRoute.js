import {Router} from 'express';
import * as CC from '../Controllers/chatController.js';
import { auth } from '../Middleware/auth.js';


const chatRouter = Router();

chatRouter
  .post("/",auth, CC.accessChat)
  .get("/",auth, CC.fetchChats)
//   .delete("/:id", CC.deleteChat)





export default chatRouter;