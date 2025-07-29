import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

cloudinary.config({
  cloud_name: 'dbad5t3xh',
  api_key: '988765737452548',
  api_secret: 'yL7M4hFbR1hk_8LEYKAnAFUQIYA',
});

// Multer: saving in computer RAM
const upload = multer({ storage: multer.memoryStorage() });

export { cloudinary, upload };
