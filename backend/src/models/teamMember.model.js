import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: {
        url: { type: String, required: true },       
        public_id: { type: String, required: true }  
    },
    position: { type: String, required: true },
    description: { type: String, required: false },
    order: { type: Number, required: false, default: 999 }, // Lower numbers appear first (e.g., President = 1)
}, {timestamps: true});
const teamMember = mongoose.model("teamMember", teamMemberSchema);
export default teamMember;