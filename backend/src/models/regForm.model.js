import mongoose from "mongoose";
const regFormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true , unique: true },
    phone: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    rollNo: {type: String, required: true},
    semester: { type: String, required: true },

 } , {timestamps: true });
const regForm = mongoose.model("regForm", regFormSchema);
export default regForm;