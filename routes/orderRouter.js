import express from 'express';
import {
  protectedMiddleware,
  ownerMiddleware,
} from '../middlewares/authMiddleware.js';
import {
  createOrder,
  allOrder,
  detailOrder,
  currentUserOrder,
} from '../controllers/orderController.js';

const router = express.Router();

// post /api/v1/order
// only accesed by user auth
router.post('/', protectedMiddleware, createOrder);

// get /api/v1/order
// only accesed by user role owner
router.get('/', protectedMiddleware, ownerMiddleware, allOrder);

// post /api/v1/order/:id
// only accesed by user role owner
router.get('/:id', protectedMiddleware, ownerMiddleware, detailOrder);

// get /api/v1/order/current/user
// only accesed by user auth
router.get('/current/user', protectedMiddleware, currentUserOrder);

export default router;
