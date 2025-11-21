import { Router } from "express";
import { deleteForm, getAllForms, getSingleForm, submitForm } from "../controllers/regForm.controller.js";
import { isLoggedIn } from "../middlewares/auth.js"; // Import the middleware

const router = Router();

router.post("/", submitForm); // Protect submitForm
router.get("/", getAllForms); // Public route
router.get("/:id", getSingleForm); // Public route
router.delete("/:id", deleteForm); // Protect deleteForm

export default router;