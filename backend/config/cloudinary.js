import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { API_KEY, CLOUD_NAME, API_SECRET } from './env.js';

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

// Multer: saving in computer RAM
const upload = multer({ storage: multer.memoryStorage() });

export { cloudinary, upload };
