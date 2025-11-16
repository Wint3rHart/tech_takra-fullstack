import mongoose from "mongoose";
const eventsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    location: String,
    image: String,
    category: { type: String, default: "general" }, // sports, charity, etc.
    isFeatured: { type: Boolean, default: false }   
  },
  { timestamps: true });
const events = mongoose.model("events", eventsSchema);
export default events;