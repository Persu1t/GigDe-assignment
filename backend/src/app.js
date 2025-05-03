import express from "express";
import cors from "cors";
import authRoutes from './routes/auth.route.js';
import projectRoutes from "./routes/project.route.js"
import taskRoutes from "./routes/task.route.js";
const app = express();

app.use(
    cors({
        origin: "https://task-tracker-eta-eight.vercel.app",
        credentials: true,
    })
);

// common middleware
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({ extended: true, limit: "16kb"}));
app.use(express.static("public"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes)
app.use("/api/v1/tasks", taskRoutes)
// app.use(errorHandler)
export { app }