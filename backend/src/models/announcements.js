import mongoose from "mongoose";

const announcementSchema= new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
}, {timestamps: true});
const announcement = mongoose.model("announcement", announcementSchema);
export default announcement;