import teamMember from "../models/teamMember.model.js";
import mongoose from "mongoose";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import {v2 as cloudinary} from "cloudinary";
export const createTeamMember = async (req, res) => {
    try {
        const { name, position, description, order } = req.body;
        let imageUrl = null;
        if (req.file) {
            const result  = await uploadToCloudinary(req.file.buffer, "team");
            imageUrl = {
                url: result.url,
                public_id: result.public_id
            }
        }
        // Parse order as number, default to 999 if not provided
        const orderValue = order !== undefined && order !== null && order !== '' 
            ? parseInt(order, 10) 
            : 999;
        
        const newTeamMember = await teamMember.create({
            name,
            image: imageUrl,
            position,
            description,
            order: orderValue,
        });
        res.status(201).json(newTeamMember);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
export const getAllTeamMembers = async (req, res) => {
    try {
        // Sort by order field (ascending - lower numbers first), then by createdAt as fallback
        const allTeamMembers = await teamMember.find({}).sort({ order: 1, createdAt: 1 });
        if(!allTeamMembers) {
            res.status(404).json({ msg: "No team members found" });
        }
        res.status(200).json(allTeamMembers);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getSingleTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid team member ID" });
        }
        const singleTeamMember = await teamMember.findById(id);
        if(!singleTeamMember) {
            return res.status(404).json({ msg: "Team member not found" });
        }
        res.status(200).json(singleTeamMember);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid team member ID" });
    }

    const deletedTeamMember = await teamMember.findByIdAndDelete(id);
    if (!deletedTeamMember) {
      return res.status(404).json({ msg: "Team member not found" });
    }

    // Delete image from Cloudinary
    if (deletedTeamMember.image && deletedTeamMember.image.public_id) {
      await cloudinary.uploader.destroy(deletedTeamMember.image.public_id);
    }

    res.status(200).json({ msg: "Team member deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid team member ID" });
    }

    const { name, position, description, order } = req.body;

    let updateData = { name, position, description };

    // Handle order field - parse as number if provided
    if (order !== undefined && order !== null && order !== '') {
      updateData.order = parseInt(order, 10);
    }

    if (req.file) {
      // Find existing member to delete old image
      const existingMember = await teamMember.findById(id);
      if (!existingMember) return res.status(404).json({ msg: "Team member not found" });

      // Delete old image from Cloudinary if exists
      if (existingMember.image && existingMember.image.public_id) {
        await cloudinary.uploader.destroy(existingMember.image.public_id);
      }

      // Upload new image
      const result = await uploadToCloudinary(req.file.buffer, "team");
      updateData.image = {
        url: result.url,
        public_id: result.public_id
      };
    }

    const updatedTeamMember = await teamMember.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json(updatedTeamMember);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};
