import express from 'express';
import { createTask, getTasks, updateTask, deleteTask, getTaskById } from '../controller/task.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post("/create-task", protect, createTask);
router.get("/get-tasks/:projectId", protect, getTasks)
router.put("/update-task/:taskId", protect, updateTask)
router.delete("/delete-task/:taskId", protect, deleteTask)
router.get("/get-task/:taskId", protect, getTaskById)
export default router;