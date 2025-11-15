import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './lib/connectDb.js';
//import authRoutes from './routes/auth.route.js';
//import cookieParser from "cookie-parser";
const app =express();
dotenv.config();
//app.use(express.json()); 
//app.use(cookieParser());
const port = process.env.PORT;
//app.use("/api/auth", authRoutes)
const startServer = async () => {
  try {
    await connectDb(); // ✅ Wait for DB to connect first
    console.log("✅ Database connected");
    // ✅ Start the server after DB and admin are ready
    app.listen(port, () => {
      console.log("🚀 Server running on port:", port);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1); // optional: force exit on failure
  }
};

startServer();