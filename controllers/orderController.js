import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import midtransClient from 'midtrans-client';
import dotnev from 'dotenv';
dotnev.config();

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER,
});

export const createOrder = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, email, cartItems } = req.body;

  if (!cartItems || cartItems.length < 1) {
    res.status(400);
    throw new Error('Cart empty');
  }

  let orderItems = [];
  let orderMidtrans = [];
  let total = 0;

  for (const cart of cartItems) {
    const productData = await Product.findOne({ _id: cart.product });
    if (!productData) {
      res.status(404);
      throw new Error('Product ID not found');
    }

    const { name, price, _id, stock } = productData;

    if (cart.quantity > stock) {
      res.status(400);
      throw new Error(
        `Quantity of product ${name} is out of stock, let 's try to reorder product`
      );
    }

    const singleProduct = {
      quantity: cart.quantity,
      name,
      price,
      product: _id,
    };

    const shortName = name.substring(0, 30);
    const singleProductMidtrans = {
      quantity: cart.quantity,
      name: shortName,
      price,
      id: _id,
    };

    orderItems = [...orderItems, singleProduct];
    orderMidtrans = [...orderMidtrans, singleProductMidtrans];

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

  let parameter = {
    transaction_details: {
      order_id: order._id,
      gross_amount: total,
    },
    item_details: orderMidtrans,
    customer_details: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
    },
  };

  const token = await snap.createTransaction(parameter);

  return res.status(201).json({
    total,
    order,
    message: 'Order Product Success',
    token,
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

export const callbackPayment = asyncHandler(async (req, res) => {
  const statusResponse = await snap.transaction.notification(req.body);

  let orderId = statusResponse.order_id;
  let transactionStatus = statusResponse.transaction_status;
  let fraudStatus = statusResponse.fraud_status;

  const orderData = await Order.findById(orderId);

  if (!orderData) {
    res.status(404);
    throw new Error('Order not found');
  }
  if (transactionStatus === 'capture' || transactionStatus === 'settlement') {
    if (fraudStatus === 'accept') {
      orderData.status = 'success';
      const orderProduct = orderData.itemsDetail;

      for (const itemProduct of orderProduct) {
        const productData = await Product.findById(itemProduct.product);

        if (!productData) {
          res.status(404);
          throw new Error('Product not found');
        }

        productData.stock = productData.stock -= itemProduct.quantity;

        await productData.save();
      }
    }
  } else if (
    transactionStatus === 'cancel' ||
    transactionStatus === 'deny' ||
    transactionStatus === 'expire'
  ) {
    orderData.status = 'failed';
  } else if (transactionStatus === 'pending') {
    orderData.status = 'pending';
  }
  await orderData.save();

  return res.status(200).send('Payment Notification Success');
});
