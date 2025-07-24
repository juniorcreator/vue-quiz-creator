import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define the MongoDB URI variable inside .env.dev/prod.local",
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`✅ Connected to MongoDB`);
  } catch (error) {
    console.error("Error connecting to database: ", error);
    process.exit(1);
  }
};

export default connectToDatabase;
