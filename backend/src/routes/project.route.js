import express from 'express';
import { createProject, deleteProject, getProjects } from '../controller/project.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// POST /api/v1/projects
router.post('/create', protect, createProject);
router.get('/get-projects', protect, getProjects)
router.delete('/delete-project/:id', protect, deleteProject)
export default router;