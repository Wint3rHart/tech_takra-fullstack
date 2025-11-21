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
app.use(
  cors({
    origin: [
      "https://tech-takra-fullstack-five.vercel.app", // your frontend
      "http://localhost:3000" // for testing locally
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
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