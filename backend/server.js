import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Initialize dotenv
const { PORT } = process.env; // environment variables

const app = express();
app.use(express.json()); // Body Parser

//------------------------------------------------------------------------------------
// test example from socketIO homepage
app.get('/', (req, res) => {
  res.sendFile(new URL('./testa/test.html', import.meta.url).pathname);
});

//------------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server is listening to port: ${PORT}`);
});
