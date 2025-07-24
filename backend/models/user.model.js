import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 6,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      trim: true,
      required: true,
      default: 'user',
    },
    quizzes: [
      {
        title: String,
        description: String,
        questions: [
          {
            question: String,
            options: [String],
            answer: String,
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
