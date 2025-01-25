import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;

// Schema untuk item individual
const singleProduct = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
});

// Schema untuk order
const orderSchema = new Schema({
  total: {
    type: Number,
    required: [true, `Total price can't be empty`],
  },
  itemsDetail: [singleProduct], // Definisi array dari singleProduct
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'failed', 'success'],
    default: 'pending',
  },
  firstName: {
    type: String,
    required: [true, `First Name can't be empty`],
  },
  lastName: {
    type: String,
    required: [true, `Last Name can't be empty`],
  },
  phone: {
    type: String,
    required: [true, `Phone can't be empty`],
    validate: {
      validator: function (v) {
        return /^(?:\+62|0)[2-9][0-9]{7,11}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Indonesian Phone`,
    },
  },
  email: {
    type: String,
    required: [true, "Email can't be empty"],
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} is not a valid Email!`,
    },
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
