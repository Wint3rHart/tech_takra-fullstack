import express from "express";
import {
  loginAdmin,
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  getMyProfile,
  refreshAccessToken
} from "../controllers/admin.controller.js";

import { isLoggedIn, isSuperAdmin } from "../middlewares/auth.js";

const router = express.Router();


router.post("/login", loginAdmin);
router.post("/create", isLoggedIn, isSuperAdmin, createAdmin);
router.delete("/delete/:id", isLoggedIn, isSuperAdmin, deleteAdmin);
router.get("/all", isLoggedIn, isSuperAdmin, getAllAdmins);
router.get("/me", isLoggedIn, getMyProfile);
router.post("/refresh-token", refreshAccessToken);

export default router;
