import { cloudinary } from '../config/cloudinary.js';
import streamifier from 'streamifier';
import User from '../models/user.model.js';

export const uploadAvatar = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'File not found' });

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'quiz-generator-avatar' },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        },
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    res.status(200).json({
      message: 'File uploaded successfully',
      url: result.secure_url,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error file uploading', error: err });
  }
};
export const updateAvatar = async (req, res) => {
  const { userId, avatarUrl } = req.body;
  console.log(userId, ' userId is');

  if (!avatarUrl) {
    return res.status(400).json({ success: false, message: 'URL avatar not provided' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { avatar: avatarUrl }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Avatar updated successfully',
      avatarUrl: updatedUser.avatar,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating avatar', error: err });
  }
};
