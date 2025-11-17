import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    position: { type: String, required: true },
    description: { type: String, required: false },
});
const teamMember = mongoose.model("teamMember", teamMemberSchema);
export default teamMember;