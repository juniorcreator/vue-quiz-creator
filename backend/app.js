import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import authRouter from './routes/auth-routes.js';
import errorMiddleware from './middleware/error.middleware.js';
import authorize from './middleware/auth.middleware.js';
import { getProfile } from './controllers/auth.controller.js';
import quizRouter from './routes/quiz-routes.js';
dotenv.config();

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is running');
});
app.use('/auth', authRouter);
app.use('/quiz', quizRouter);
app.get('/profile', authorize, getProfile);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Listening on http://localhost:${PORT}`);
  await connectToDatabase();
});
