import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";


// Load environment variables from .env file
dotenv.config({
  path: './.env'
});
// Initialize Express app
const app = express();
 const PORT = Number(process.env.PORT) || 5000;
;

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});