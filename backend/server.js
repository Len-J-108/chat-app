import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

import { User } from './Models/userModel.js';

// MongoDB Connection
import './utils/mongodb.js';

// Import routes
import loginRouter from './Routes/loginRoute.js';
import registerRouter from './Routes/registerRoute.js';



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

// Login Route
app.use("/login", loginRouter);

// Register Route
app.use("/register", registerRouter);

//------------------------------------------------------------------------------------
// TESTING TESTING TESTING
app.get("/getAll", async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
})

// delete all enstries from DB (just for testing)
app.delete("/delete-all", async (req, res) => {
  await User.deleteMany();
  console.log('deleted every entry');
  res.end();
  // res.status(200).send('deleted every entry');
})

app.get("/cookieTest", (req, res) => {
  console.log('COOKIES', req.cookies);
  res.end()
});

//------------------------------------------------------------------------------------
// Server listen
server.listen(PORT, () => {
  console.log(`Server is listening to port: ${PORT}`);
});

