import asyncHandler from '../middlewares/asyncHandler.js';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// @desc Get cart by user
// @route GET /api/v1/cart
// @access Private
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate({
    path: 'items.product',
    select: 'name image price stock',
  });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  res.status(200).json(cart);
});

// @desc Add or update cart
// @route POST /api/v1/cart
// @access Private
const createCart = asyncHandler(async (req, res) => {
  const { items } = req.body;
  const userId = req.user._id;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items });
  } else {
    items.forEach((newItem) => {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === newItem.product
      );
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        cart.items.push(newItem);
      }
    });
  }

  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();
  res.status(201).json(cart);
});

// @desc Delete one item from cart
// @route DELETE /api/v1/cart/:productId
// @access Private
const deleteCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cartId = req.params.cartId; // Pakai cartId dari params

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  // Filter item yang tidak dihapus
  cart.items = cart.items.filter((item) => item._id.toString() !== cartId);

  // Hitung ulang total harga
  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();
  res.status(200).json({ message: 'Item removed from cart', cartId });
});

// @desc Update item quantity in cart
// @route PUT /api/v1/cart/:productId
// @access Private
const updateCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cartId = req.params.cartId;
  const { quantity } = req.body;

  console.log(`User ID: ${userId}, Cart ID: ${cartId}, Quantity: ${quantity}`);

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    console.log('Cart not found');
    return res.status(404).json({ message: 'Cart not found' });
  }

  console.log(
    'Cart items:',
    cart.items.map((item) => item._id.toString())
  );

  const itemIndex = cart.items.findIndex(
    (item) => item._id.toString() === cartId
  );

  if (itemIndex === -1) {
    console.log('Item not found in cart');
    return res.status(404).json({ message: 'Item not found in cart' });
  }

  console.log('Found item:', cart.items[itemIndex]);

  if (quantity <= 0) {
    console.log('Removing item from cart');
    cart.items.splice(itemIndex, 1);
  } else {
    const product = await Product.findById(cart.items[itemIndex].product);
    if (!product) {
      console.log('Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }

    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].price = product.price;
  }

  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();
  console.log('Cart updated successfully');
  res.status(200).json(cart);
});

export { getCart, createCart, deleteCart, updateCart };
