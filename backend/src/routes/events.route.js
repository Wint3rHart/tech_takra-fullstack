import Router from "express";
import upload from "../middlewares/upload.js";
import { createEvent, deleteEvent, getAllEvents, pastEvents, singleEvent, upcomingEvents, updateEvent } from "../controllers/events.controller.js";
import { isLoggedIn, isSuperAdmin } from "../middlewares/auth.js"; // Import the middleware

const router = Router();

router.get("/", getAllEvents); // Public route
router.post("/create",  upload.array("images", 5), createEvent); // Protect createEvent
router.patch("/update/:id", upload.array("images", 5), updateEvent); // Protect updateEvent
router.delete("/delete/:id",  isSuperAdmin, deleteEvent); // Protect deleteEvent
router.get("/upcoming", upcomingEvents); // Public route
router.get("/past", pastEvents); // Public route
router.get("/:id", singleEvent); // Public route

export default router;