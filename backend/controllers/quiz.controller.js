import mongoose from 'mongoose';
import User from '../models/user.model.js';

export const quizAdd = async (req, res, next) => {
  try {
    console.log(req.body, ' req.body');
    const { userId, quiz } = req.body;

    if (!userId || !quiz) {
      return res.status(404).json({ success: false, message: 'Not provided userId or quiz' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { quizzes: quiz } },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'User added quiz successfully', user: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const removeQuiz = async (req, res) => {
  const { userId, quizId } = req.body;
  console.log(userId);
  console.log(quizId);

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          quizzes: { _id: quizId },
        },
      },
      { new: true }, // return new
    );

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'quiz removed',
      quizzes: user.quizzes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error while removing quiz', err });
  }
};
