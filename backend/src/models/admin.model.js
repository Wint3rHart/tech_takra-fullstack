import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    lastLogin: {
      type: Date,
      default: null,
    }
  },
  { timestamps: true }
    
);

const admin = mongoose.model("User", adminSchema);
export default admin;