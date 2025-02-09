import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name must be filled out'],
    unique: [true, 'Username already exists, use another username'],
  },
  email: {
    type: String,
    required: [true, 'Email must be filled out'],
    unique: [true, 'Email already exists'],
    validate: {
      validator: validator.isEmail,
      message: 'Input must be in email format (example@mail.com)',
    },
  },
  password: {
    type: String,
    required: [true, 'Password must be filled out'],
    minlength: [6, 'Password must be at least 6 characters'],
    validate: {
      validator: function (value) {
        return /[A-Z]/.test(value) && /\d/.test(value);
      },
      message: 'Password must contain at least 1 uppercase letter and 1 number',
    },
  },
  role: {
    type: String,
    enum: ['user', 'owner'],
    default: 'user',
  },
});

// ✅ Hash password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password not modified

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Rename comparePassword to matchPassword
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
