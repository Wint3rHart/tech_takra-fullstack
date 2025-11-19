import regForm from "../models/regForm.model.js";
import mongoose from "mongoose";
export const submitForm = async (req, res) => {
    try {
        const { name, email, phone, department, rollNo, semester } = req.body;
        const newRegForm = await regForm.create({
            name,
            email,
            phone,
            department,
            rollNo,
            semester,
        });
        res.status(201).json(newRegForm);
    } catch (error) {
        if(error.code === 11000) {
            return res.status(400).json({ message: "Email or Phone number Already exists" });
        }
        res.status(500).json({ message: error.message });
    }
};

export const getAllForms = async (req, res) => {
    try {
        const allForms = await regForm.find({});
        if(!allForms) {
            return res.status(404).json({ message: "No forms found" });
        }
        res.status(200).json(allForms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getSingleForm = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid form ID" });
        }
        const singleForm = await regForm.findById(id);
        if(!singleForm) {
            return res.status(404).json({ message: "Form not found" });
        }
        res.status(200).json(singleForm);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteForm = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid form ID" });
        }
        const deletedForm = await regForm.findByIdAndDelete(id);
        if(!deletedForm) {
            return res.status(404).json({ message: "Form not found" });
        }
        res.status(200).json({ message: "Form deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}