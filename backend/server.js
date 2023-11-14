import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

// MongoDB Connection
import './utils/mongodb.js';

// Import routes
import loginRouter from './Routes/loginRoute.js';
import registerRouter from './Routes/registerRoute.js';

dotenv.config(); // Initialize dotenv
const { PORT } = process.env; // environment variables

const app = express();
app.use(express.json()); // Body Parser
app.use(cors())

const server = createServer(app);

// Login Route
app.use("/login", loginRouter);

// Register Route
app.use("/register", registerRouter)

server.listen(PORT, () => {
  console.log(`Server is listening to port: ${PORT}`);
});

