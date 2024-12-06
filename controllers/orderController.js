import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

export const createOrder = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, email, cartItems } = req.body;

  if (!cartItems || cartItems.length < 1) {
    res.status(400);
    throw new Error('Cart empty');
  }

  let orderItems = [];
  let total = 0;

  for (const cart of cartItems) {
    const productData = await Product.findOne({ _id: cart.product });
    if (!productData) {
      res.status(404);
      throw new Error('Product ID not found');
    }

    const { name, price, _id } = productData;
    const singleProduct = {
      quantity: cart.quantity,
      name,
      price,
      product: _id,
    };

    orderItems = [...orderItems, singleProduct];
    total += cart.quantity * price;
  }

  const order = await Order.create({
    itemsDetail: orderItems,
    total,
    firstName,
    lastName,
    phone,
    email,
    user: req.user.id,
  });

  return res.status(201).json({
    total,
    order,
    message: 'Order Product Success',
  });
});

export const allOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  return res.status(200).json({
    data: orders,
    message: 'All Order Product showed Success',
  });
});

export const detailOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  return res.status(200).json({
    data: order,
    message: 'Detail Order Product Success',
  });
});

export const currentUserOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user.id });

  return res.status(200).json({
    data: order,
    message: 'Current User Order Product Success',
  });
});
