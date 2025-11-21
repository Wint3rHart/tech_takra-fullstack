import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './lib/connectDb.js';
import eventRoutes from './routes/events.route.js';
import regFormRoutes from './routes/regform.route.js';
import teamRoutes from './routes/team.route.js';
import adminRoutes from './routes/admin.route.js'
import announcementRoutes from './routes/announcement.route.js';
//import cookieParser from "cookie-parser";
const app =express();
dotenv.config();

// CORS configuration - allow all Vercel deployments and localhost
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://tech-takra-fullstack-five.vercel.app",
  // Add your production frontend URL here
  process.env.FRONTEND_URL,
  // Add any other production URLs
  process.env.PRODUCTION_FRONTEND_URL,
].filter(Boolean); // Remove undefined values

// Vercel pattern for preview deployments
const vercelPattern = /^https:\/\/.*\.vercel\.app$/;

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      
      // Check if origin matches Vercel pattern
      if (vercelPattern.test(origin)) {
        return callback(null, true);
      }
      
      // Check if origin is in allowed list
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      // In development, allow all origins for easier debugging
      if (process.env.NODE_ENV === 'development') {
        console.log(`Allowing origin in development: ${origin}`);
        return callback(null, true);
      }
      
      // Block in production if not in allowed list
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Cache-Status"],
    exposedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json()); 
//app.use(cookieParser());
const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.use("/api/auth/admin" , adminRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/regForm", regFormRoutes)
app.use("/api/team" , teamRoutes)
app.use("/api/announcement" , announcementRoutes)

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