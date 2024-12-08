import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import multer from 'multer';
import dotenv from 'dotenv';
import { connectDB } from './db/dbconfig.js';

const app = express();

dotenv.config({
  path: '../.env',
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json({ limit: '20kb' }));

app.use(
  express.urlencoded({
    extended: true,
    limit: '20kb',
  }),
);

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send(
    '<h1>THIS PAGE IS DEDICATED FOR BACKEND OF CineShelf-O - likith</h1>',
  );
});

// User Authentication routes here
import { userauthroutes } from './routes/user.auth.routes.js';
app.use('/api/user', userauthroutes);

// Admin Authentication routes here
import { adminauthroutes } from './routes/admin.auth.routes.js';
app.use('/api/admin', adminauthroutes);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server running on port ${process.env.PORT || 8080}\n`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
