import express from 'express';
import { getCurrentUser, registerUser } from '../controller/auth.controller.js';
import { loginUser } from '../controller/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', registerUser);
router.post('/login', loginUser); // Assuming loginUser is also handled by registerUser for simplicity
router.get("/user", protect, getCurrentUser);

export default router;

// 