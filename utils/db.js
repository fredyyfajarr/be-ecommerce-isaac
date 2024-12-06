import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = mongoose
  .connect(process.env.DATABASE, {})
  .then(() => {
    console.log('Database Connected');
  })
  .catch((error) => {
    console.error('Database Connection Error:', error);
  });

export default db;
