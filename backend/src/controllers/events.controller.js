import events from "../models/events.model.js";
import mongoose from "mongoose";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { v2 as cloudinary } from "cloudinary";
export const getAllEvents = async (req, res) => {
    try {
        const allEvents = await events.find({}).sort({ createdAt: -1 });
        res.status(200).json(allEvents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, category, isFeatured } = req.body;

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // uploadToCloudinary should return { public_id, secure_url }
        const result = await uploadToCloudinary(file.buffer, "events");
        imageUrls.push({ url: result.url, public_id: result.public_id });
      }
    }

    const newEvent = await events.create({
      title,
      description,
      date,
      location,
      category,
      isFeatured,
      images: imageUrls
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        const { title, description, date, location, category, isFeatured } = req.body;

        let updateData = {
            title,
            description,
            date,
            location,
            category,
            isFeatured
        };

        // If new images were uploaded → upload & push
        if (req.files && req.files.length > 0) {
            const newUrls = [];

            for (const file of req.files) {
                const url = await uploadToCloudinary(file.buffer, "events");
                newUrls.push(url);
            }

            // Add new images without removing old ones
            updateData.$push = { images: { $each: newUrls } };
        }

        const updatedEvent = await events.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json(updatedEvent);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }
        const deletedEvent = await events.findByIdAndDelete(id);
        if(!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        if (deletedEvent.images && deletedEvent.images.length > 0) {
        for (const img of deletedEvent.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
                  }
            }
        }
        res.status(200).json({ message: "Event deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const upcomingEvents = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingEventsList = await events
            .find({ date: { $gte: today } })
            .sort({ date: 1 });

        res.status(200).json(upcomingEventsList);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const pastEvents = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const pastEvents = await events.find({ date: { $lt: new Date() } }).sort({ date: -1 });
        res.status(200).json(pastEvents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const singleEvent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        const singleEvent = await events.findById(id);

        if (!singleEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(singleEvent);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
