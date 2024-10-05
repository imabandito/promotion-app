import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import articlesRoutes from './routes/articleRoutes';
import './config/passportGoogle';
import './config/passportLocal';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(cookieParser());

app.use(passport.initialize());
app.use('/auth', authRoutes);
app.use('/articles', articlesRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT ,() => {
      console.log(`Server running on ${process.env.API_URL}`);
    });
  })
  .catch((err) => console.error(err));

