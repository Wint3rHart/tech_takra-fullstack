import { Router } from "express";
import { createAnnouncement, deleteAnnouncement, getAllAnnouncements, getSingleAnnouncement, updateAnnouncement } from "../controllers/announcement.controller.js";
import { isLoggedIn } from "../middlewares/auth.js"; // Import the middleware

const router = Router();

router.post("/create", isLoggedIn, createAnnouncement); // Protect createAnnouncement
router.get("/", getAllAnnouncements); // Public route
router.get("/:id", getSingleAnnouncement); // Public route
router.patch("/update/:id", isLoggedIn, updateAnnouncement); // Protect updateAnnouncement
router.delete("/delete/:id", isLoggedIn, deleteAnnouncement); // Protect deleteAnnouncement

export default router;