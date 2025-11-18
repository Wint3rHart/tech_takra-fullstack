import { Router } from "express";
import { deleteForm, getAllForms, getSingleForm, submitForm } from "../controllers/regForm.controller.js";

const router = Router();

router.post("/" , submitForm);
router.get("/" , getAllForms) 
router.get("/:id" , getSingleForm)
router.delete("/:id" , deleteForm)

export default router;