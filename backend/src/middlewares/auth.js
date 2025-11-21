import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

// -----------------------------------------------------
// Authenticate any admin
// -----------------------------------------------------
export const isLoggedIn = async (req, res, next) => {
  try {
    // Fix: authorization should be in quotes or use dot notation
    const authHeader = req.headers.authorization || req.headers["authorization"];
    
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized - No authorization header" });
    }

    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || (!decoded.id && !decoded._id)) {
      return res.status(401).json({ message: "Invalid token - Missing admin ID" });
    }

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
    // Ensure isLoggedIn has run first
    if (!req.admin) {
      return res.status(401).json({ message: "Unauthorized - Please login first" });
    }

    // First check role from JWT token (faster, no DB lookup needed)
    const roleFromToken = req.admin?.role;
    if (roleFromToken && roleFromToken.toLowerCase() === "superadmin") {
      return next();
    }

    // If role not in token or doesn't match, check database
    const adminId = req.admin?.id || req.admin?._id;
    if (!adminId) {
      return res.status(403).json({ message: "Access denied - Invalid admin ID" });
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(403).json({ message: "Access denied - Admin not found" });
    }

    if (admin.role?.toLowerCase() !== "superadmin") {
      return res.status(403).json({ message: "Access denied - Superadmin only" });
    }

    next();

  } catch (error) {
    console.error("isSuperAdmin error:", error);
    res.status(500).json({ message: error.message });
  }
};
