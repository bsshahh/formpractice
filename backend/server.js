import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js'; 
dotenv.config();

connectDB();

const PORT = process.env.PORT || 9800;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
