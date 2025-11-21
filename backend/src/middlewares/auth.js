import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

// -----------------------------------------------------
// Authenticate any admin
// -----------------------------------------------------
export const isLoggedIn = async (req, res, next) => {
  try {
    // Fix: authorization should be in quotes or use dot notation
    const authHeader = req.headers.authorization || req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "Unauthorized - No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded;
    next();

  } catch (error) {
    // Provide more specific error message
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};

// -----------------------------------------------------
// Check if SUPERADMIN
// -----------------------------------------------------
export const isSuperAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id);

    if (!admin || admin.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied - Superadmin only" });
    }

    next();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
