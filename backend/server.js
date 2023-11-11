import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

// MongoDB Connection
import './utils/mongodb.js';

dotenv.config(); // Initialize dotenv
const { PORT } = process.env; // environment variables

const app = express();
// app.use(express.json()); // Body Parser
const server = createServer(app);
const io = new Server(server);

//------------------------------------------------------------------------------------
// test example from socketIO homepage
app.get('/', (req, res) => {
  res.sendFile(new URL('./testa/test.html', import.meta.url).pathname);
});

//------------------------------------------------------------------------------------
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    // log massage in server console
    console.log(`message: ${msg}`);
    //send message to client side...
    io.emit('chat message', msg)
  })
});

server.listen(PORT, () => {
  console.log(`Server is listening to port: ${PORT}`);
});

