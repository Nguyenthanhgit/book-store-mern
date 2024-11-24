import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5555;

const __dirname = path.resolve();

//Middleware for handling CORS POLICY
app.use(cors());

// app.get('/', (request, response) => {
//   console.log(request);
//   return response.status(234).send('Welcome to MERN Stack Tutorial');
// });

//Middleware for parsing request body
app.use(express.json());

app.use('/books', booksRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (request, response) => {
    response.sendFile(
      path.resolve(__dirname, 'frontend', 'dist', 'index.html')
    );
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log('Server started at http://localhost:' + PORT);
});
