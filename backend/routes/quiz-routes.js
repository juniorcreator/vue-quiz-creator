import { Router } from 'express';
import { quizAdd, removeQuiz } from '../controllers/quiz.controller.js';
const quizRouter = Router();

quizRouter.post('/', quizAdd);
quizRouter.delete('/', removeQuiz);

export default quizRouter;
