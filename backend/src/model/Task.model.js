import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    status: {
        type: String,
        enum: ["todo", "in-progress", "done"],
        default: "todo",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    completedAt:{
        type: Date, 
        default: null,
    }
}, { timestamps: true })

export default mongoose.model("Task", taskSchema);