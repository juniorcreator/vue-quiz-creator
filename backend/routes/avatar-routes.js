import { Router } from 'express';
import { uploadAvatar, updateAvatar } from '../controllers/avatar.controller.js';
import { upload } from '../config/cloudinary.js';

const avatarRouter = Router();

avatarRouter.post('/upload', upload.single('file'), uploadAvatar);
avatarRouter.put('/upload', updateAvatar);

export default avatarRouter;
