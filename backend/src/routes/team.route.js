import { Router } from "express";
import { createTeamMember, deleteTeamMember, getAllTeamMembers, getSingleTeamMember, updateTeamMember } from "../controllers/team.controller.js";
import upload from "../middlewares/upload.js";
import { isLoggedIn, isSuperAdmin } from "../middlewares/auth.js"; // Import the middleware

const router = Router();

router.post("/create",upload.single("image"), createTeamMember); // Protect createTeamMember
router.get("/", getAllTeamMembers); // Public route
router.get("/:id", getSingleTeamMember); // Public route
router.patch("/update/:id",  upload.single("image"), updateTeamMember); // Protect updateTeamMember
router.delete("/delete/:id",  deleteTeamMember); // Protect deleteTeamMember

export default router;
