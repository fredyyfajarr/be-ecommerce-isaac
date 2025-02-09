import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

export const protectedMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.jwt; // Pastikan cookie ada sebelum diakses
  console.log('Token:', token); // Debugging

  if (!token) {
    res.status(401);
    return res.json({ message: 'Not Authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      res.status(401);
      return res.json({ message: 'Not Authorized, user not found' });
    }

    next();
  } catch (error) {
    res.status(401);
    return res.json({ message: 'Not Authorized, token failed' });
  }
});

export const ownerMiddleware = (req, res, next) => {
  if (!req.user) {
    res.status(401);
    return res.json({ message: 'Not Authorized, no user data' });
  }

  if (req.user.role !== 'owner') {
    res.status(403);
    return res.json({ message: 'Not Authorized as Owner' });
  }

  next();
};
