import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateUser,
} from '../controllers/authController.js';
import { protectedMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

//post /api/v1/auth/register
router.post('/register', registerUser);

//post /api/v1/auth/login
router.post('/login', loginUser);

//get /api/v1/auth/logout
router.get('/logout', protectedMiddleware, logoutUser);

//get /api/v1/auth/profile
router.get('/profile/:id', protectedMiddleware, getCurrentUser);

//put /api/v1/auth/profile/:id
router.put('/profile/:id', protectedMiddleware, updateUser);

export default router;
