import announcement from "../models/announcements.js";
import mongoose from "mongoose";
export const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await announcement.find();
        if(!announcements) {
            return res.status(404).json({ message: "No announcements found" });
        }
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createAnnouncement = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newAnnouncement = await announcement.create({ title, description });
        res.status(201).json(newAnnouncement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSingleAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid announcement ID" });
        }
        const singleAnnouncement = await announcement.findById(id);
        if(!singleAnnouncement) {
            return res.status(404).json({ message: "Announcement not found" });
        }
        res.status(200).json(singleAnnouncement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid announcement ID" });
        }
        const updatedAnnouncement = await announcement.findByIdAndUpdate(id, req.body, { new: true });
        if(!updatedAnnouncement) {
            return res.status(404).json({ message: "Announcement not found" });
        }
        res.status(200).json(updatedAnnouncement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const  deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid announcement ID" });
        }
        const deletedAnnouncement = await announcement.findByIdAndDelete(id);
        if(!deletedAnnouncement) {
            return res.status(404).json({ message: "Announcement not found" });
        }
        res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};