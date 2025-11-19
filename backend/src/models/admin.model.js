import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true, lowercase: true , trim: true},

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["superadmin", "admin"],
      default: "admin"
    },

    refreshToken: { type: String } // <-- Add this line
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

adminSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

adminSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

adminSchema.statics.createSuperAdmin = async function (data) {
  const superAdminExists = await this.findOne({ role: "superadmin" });

  if (superAdminExists) {
    throw new Error("Superadmin already exists — cannot create another.");
  }

  return this.create({ ...data, role: "superadmin" });
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
