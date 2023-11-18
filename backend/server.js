import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

import usersRouter from './Routes/usersRoute.js';
import userRouter from './Routes/userRoute.js';


// MongoDB Connection
import './utils/mongodb.js';




dotenv.config(); // Initialize dotenv
const { PORT } = process.env; // environment variables

const app = express();
app.use(express.json()); // Body Parser
// app.use(cors());


app.use(
  cors({
      origin: 'http://localhost:5173', // 5173 is where we have set our frontend to run
      credentials: true,
  })
);


app.use(cookieParser());

const server = createServer(app);

// Mono
app.use("/user", userRouter)
// Poly
app.use("users", usersRouter)

//------------------------------------------------------------------------------------
// TESTING TESTING TESTING

// delete all enstries from DB (just for testing)
app.delete("/delete-all", async (req, res) => {
  await User.deleteMany();
  console.log('deleted every entry');
  res.end();
  // res.status(200).send('deleted every entry');
})

//------------------------------------------------------------------------------------
// Server listen
server.listen(PORT, () => {
  console.log(`Server is listening to port: ${PORT}`);
});

