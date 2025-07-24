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
