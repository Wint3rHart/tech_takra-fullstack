import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const sendToken = async (admin, res) => {
  const accessToken = admin.generateToken();
  const refreshToken = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "30d" });

  // Store refresh token in the database (hashed)
  admin.refreshToken = await bcrypt.hash(refreshToken, 10);
  await admin.save();

  res.status(200).json({
    success: true,
    accessToken,
    refreshToken,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    }
  });
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailNorm = String(email || "").toLowerCase().trim();

    const admin = await Admin.findOne({ email: emailNorm });

    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    const isMatch = await admin.comparePassword(password);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    sendToken(admin, res);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailNorm = String(email || "").toLowerCase().trim();

    // Prevent duplicates
    const exists = await Admin.findOne({ email: emailNorm });
    if (exists)
      return res.status(400).json({ message: "Email already in use" });

    const newAdmin = await Admin.create({
      name,
      email: emailNorm,
      password,
      role: "admin"
    });

    const adminObj = newAdmin.toObject();
    delete adminObj.password;
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: adminObj
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    if (admin.role === "superadmin")
      return res.status(400).json({ message: "Cannot delete superadmin" });

    await admin.deleteOne();

    res.status(200).json({ success: true, message: "Admin deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");

    res.status(200).json({
      success: true,
      admins
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");

    res.status(200).json({
      success: true,
      admin
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin || !admin.refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const isMatch = await bcrypt.compare(refreshToken, admin.refreshToken);
    if (!isMatch) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = admin.generateToken();
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try{
  const { oldPassword, newPassword } = req.body;
  const adminId = req.admin.id; // Coming from auth middleware

  const admin = await Admin.findById(adminId);

  const isMatch = await admin.comparePassword(oldPassword);
  if (!isMatch) {
    return res.status(400).json({ message: "Old password incorrect" });
  }

  admin.password = newPassword;
  await admin.save();

  res.status(200).json({ success: true, message: "Password updated" });
}
catch (error) {
  res.status(500).json({ message: error.message });
}
};

export const logoutAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    admin.refreshToken = null;
    await admin.save();
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
