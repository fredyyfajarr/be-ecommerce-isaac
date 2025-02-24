import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateUser,
  updatePasswordUser,
} from '../controllers/authController.js';
import { protectedMiddleware } from '../middlewares/authMiddleware.js';
import { upload } from '../utils/uploadFileHandler.js';

const router = express.Router();

//post /api/v1/auth/register
router.post('/register', registerUser);

//post /api/v1/auth/login
router.post('/login', loginUser);

//get /api/v1/auth/logout
router.get('/logout', protectedMiddleware, logoutUser);

//put /api/v1/auth/profile/password/:id
router.put('/profile/password/:id', protectedMiddleware, updatePasswordUser);

//get /api/v1/auth/profile
router.get('/profile/:id', protectedMiddleware, getCurrentUser);

//put /api/v1/auth/profile/:id
router.put(
  '/profile/:id',
  protectedMiddleware,
  upload.single('profile_image'),
  updateUser
);

export default router;
