import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import connectDb from "./lib/connectDb.js";

import eventRoutes from "./routes/events.route.js";
import regFormRoutes from "./routes/regform.route.js";
import teamRoutes from "./routes/team.route.js";
import adminRoutes from "./routes/admin.route.js";
import announcementRoutes from "./routes/announcement.route.js";

dotenv.config();
const app = express();

// Set security HTTP headers
app.use(helmet());

// Limit requests from the same IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // max requests per 15 mins
  message: "Too many requests. Please try again later.",
});

app.use(limiter);

// Sanitize data to prevent NoSQL injections
app.use(mongoSanitize());

// Sanitize user input to prevent XSS attacks
app.use(xss());

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://tech-takra-fullstack-five.vercel.app",
  process.env.FRONTEND_URL,
  process.env.PRODUCTION_FRONTEND_URL,
].filter(Boolean);

const vercelPattern = /^https:\/\/.*\.vercel\.app$/;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Mobile apps, Postman, curl

      if (vercelPattern.test(origin)) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      if (process.env.NODE_ENV === "development") return callback(null, true);

      console.warn("❌ CORS blocked origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Cache-Status"],
    exposedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" })); 

// Routes 

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.use("/api/auth/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/regForm", regFormRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/announcement", announcementRoutes);

// Error Handlers: 

app.use((err, req, res, next) => {
  console.error("⚠ Backend Error:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});


const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDb();
    console.log("✅ Database connected");

    app.listen(port, () =>
      console.log(`🚀 Server running on port: ${port}`)
    );
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
