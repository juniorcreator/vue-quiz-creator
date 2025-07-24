import dotenv from 'dotenv';
dotenv.config();

const { PORT, DB_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export { PORT, DB_URI, JWT_SECRET, JWT_EXPIRES_IN };
