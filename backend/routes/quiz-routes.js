import { Router } from 'express';
import { quizAdd } from '../controllers/quiz.controller.js';
const quizRouter = Router();

quizRouter.post('/add', quizAdd);

export default quizRouter;
