import {Router} from "express"
import { createTeamMember, deleteTeamMember, getAllTeamMembers, getSingleTeamMember, updateTeamMember } from "../controllers/team.controller.js";
import upload from "../middlewares/upload.js";
const router = Router();

router.post("/create" ,  upload.single("image") , createTeamMember);
router.get("/" , getAllTeamMembers);
router.get("/:id" , getSingleTeamMember);
router.patch("/update/:id" , upload.single("image")  , updateTeamMember);
router.delete("/delete/:id" , deleteTeamMember);

export default router;
