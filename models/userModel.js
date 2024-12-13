import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name must filled out'],
    unique: [true, 'Username already exist, use another username'],
  },
  email: {
    type: String,
    required: [true, 'Email must filled out'],
    unique: [true, 'Email already exist'],
    validate: {
      validator: validator.isEmail,
      message: 'Input must be email format .. (rocket@mail.com)',
    },
  },
  password: {
    type: String,
    required: [true, 'Password must filled out'],
    minLength: [6, 'Password minimum 6 character'],
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

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (reqBody) {
  return await bcrypt.compare(reqBody, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
