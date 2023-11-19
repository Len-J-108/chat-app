import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'node:http';
// import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

import userRouter from './Routes/userRoute.js';
import usersRouter from './Routes/usersRoute.js';


// MongoDB Connection
import './utils/mongodb.js';

dotenv.config(); // Initialize dotenv
const { PORT } = process.env; // environment variables

const app = express();
app.use(express.json()); // Body Parser

app.use(
  cors({
      origin: 'http://localhost:5173', // 5173 is where we have set our frontend to run
      credentials: true,
  })
);

app.use(cookieParser());

const server = createServer(app);
//------------------------------------------------------------------------------------

// Mono
app.use("/user", userRouter)
// Poly
app.use("/users", usersRouter)



//------------------------------------------------------------------------------------
// Server listen
server.listen(PORT, () => {
  console.log(`Server is listening to port: ${PORT}`);
});

