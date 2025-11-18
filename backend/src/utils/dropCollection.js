import mongoose from "mongoose";


// -------------------- TeamMember Model --------------------
const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
    position: { type: String, required: true },
    description: { type: String, required: false }
}, { timestamps: true });

const TeamMember = mongoose.model("teamMember", teamMemberSchema);

// -------------------- Drop Script --------------------
async function dropCollections() {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb+srv://CSS:fs5hqcUCpS3cp7D@tech-takra.n8rnlj0.mongodb.net/?appName=tech-takra");
        console.log("Connected to MongoDB");
  

        // Drop TeamMember collection if exists
        const teamMemberCollections = await mongoose.connection.db.listCollections({ name: "teammembers" }).toArray();
        if (teamMemberCollections.length > 0) {
            await mongoose.connection.db.dropCollection("teammembers");
            console.log("TeamMember collection dropped!");
        } else {
            console.log("TeamMember collection does not exist.");
        }

        // Sync indexes
        await TeamMember.syncIndexes();
        console.log("Indexes synced!");

        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

dropCollections();
