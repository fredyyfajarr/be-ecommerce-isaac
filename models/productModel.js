import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product Name must be filled out'],
    unique: [true, 'Product Name already exist'],
  },
  price: {
    type: Number,
    required: [true, 'Product Price must be filled out'],
  },
  description: {
    type: String,
    required: [true, 'Description must be filled out'],
    maxLength: [255, 'Max 255 Character'],
  },
  image: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    required: [true, 'Category must be selected'],
    enum: ['sepatu', 'kemeja', 'hoodie', 'baju'],
  },
  stock: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
