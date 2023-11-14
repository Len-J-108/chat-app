import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

// MongoDB Connection
import './utils/mongodb.js';

dotenv.config(); // Initialize dotenv
const { PORT } = process.env; // environment variables

const app = express();
app.use(express.json()); // Body Parser
app.use(cors())

const server = createServer(app);
const io =

app.get("/test", (req, res) => {
  console.log('Inside TEST !!');
  res.status(200).send('inside test')
})

app.post("/register", (req, res) => {
  console.log('post reqiest with body: ', req.body);
  res.status(200).end();
})

app.post("/login", (req, res) => {
  console.log('postRequest Login with body: ', req.body);
  res.status(200).end();
})

server.listen(PORT, () => {
  console.log(`Server is listening to port: ${PORT}`);
});

