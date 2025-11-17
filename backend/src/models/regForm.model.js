import mongoose from "mongoose";
const regFormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    semester: { type: String, required: true },

});
const regForm = mongoose.model("regForm", regFormSchema);
export default regForm;