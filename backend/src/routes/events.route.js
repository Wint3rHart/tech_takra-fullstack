import  Router  from "express";
import upload from "../middlewares/upload.js";
import { createEvent, deleteEvent, getAllEvents, pastEvents, singleEvent, upcomingEvents, updateEvent } from "../controllers/events.controller.js";
const router = Router();


router.get("/" , getAllEvents);
router.post("/create" , upload.array("images" , 5) , createEvent);
router.patch("/update/:id" , upload.array("images" , 5), updateEvent);
router.delete("/delete/:id" , deleteEvent);
router.get("/upcoming" , upcomingEvents);
router.get("/past" , pastEvents);
router.get("/:id" , singleEvent);

export default router;