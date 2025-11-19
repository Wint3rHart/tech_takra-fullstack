import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

// -----------------------------------------------------
// Authenticate any admin
// -----------------------------------------------------
export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "Unauthorized - No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded;
    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
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
