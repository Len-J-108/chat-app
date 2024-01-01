import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'node:http';
// import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

// Router
import userRouter from './Routes/userRoute.js';
import chatRouter from './Routes/chatRoute.js';

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
app.use("/user", userRouter)
app.use("/chat", chatRouter)

//------------------------------------------------------------------------------------
// Server listen
server.listen(PORT, () => {
  console.log(`Server is listening to port: ${PORT}`);
});

