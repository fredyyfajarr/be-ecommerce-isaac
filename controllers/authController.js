import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import asyncHandler from '../middlewares/asyncHandler.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '6d',
  });
};

const createSendResToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const isDev = process.env.NODE_ENV === 'development' ? false : true;

  const cookieOption = {
    expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    security: isDev,
  };

  res.cookie('jwt', token, cookieOption);

  user.password = undefined;

  res.status(statusCode).json({
    data: user,
  });
};

export const registerUser = asyncHandler(async (req, res) => {
  const isOwner = (await User.countDocuments()) === 0;

  const role = isOwner ? 'owner' : 'user';

  const createUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role,
  });
  createSendResToken(createUser, 201, res);
});

export const loginUser = asyncHandler(async (req, res) => {
  // validation
  if (!req.body.email || !req.body.password) {
    res.status(400);
    throw new Error('Email/password must be filled');
  }

  // check email
  const userData = await User.findOne({
    email: req.body.email,
  });

  // check password
  if (userData && (await userData.comparePassword(req.body.password))) {
    createSendResToken(userData, 200, res);
  } else {
    res.status(400);
    throw new Error('Invalid User');
  }
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  if (req.params.id !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to view this profile');
  }
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    return res.status(200).json({
      user,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;
  const updateUser = await User.findByIdAndUpdate(paramsId, req.body, {
    runValidators: false,
    new: true,
  });

  return res.status(201).json({
    message: 'Profile Update Success',
    data: updateUser,
  });
});

export const updatePasswordUser = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    res.status(400);
    throw new Error('Incorrect old password');
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: 'Password updated successfully' });
});

export const logoutUser = async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    message: 'Logout Success',
  });
};
