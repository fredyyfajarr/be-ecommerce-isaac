import express from 'express';
import {
  protectedMiddleware,
  ownerMiddleware,
} from '../middlewares/authMiddleware.js';
import {
  createProduct,
  allProduct,
  detailProduct,
  updateProduct,
  deleteProduct,
  fileUpload,
} from '../controllers/productController.js';
import { upload } from '../utils/uploadFileHandler.js';

const router = express.Router();

// CRUD Product

// Create Data Product
// post /api/v1/product
// middleware owner
router.post('/', protectedMiddleware, ownerMiddleware, createProduct);

// Read Data Product
// post /api/v1/product
// middleware owner
router.get('/', allProduct);

// Detail Data Product
// post /api/v1/product/:id
// middleware owner
router.get('/:id', detailProduct);

// Update Data Product
// post /api/v1/product/:id
// middleware owner
router.put('/:id', protectedMiddleware, ownerMiddleware, updateProduct);

// Delete Data Product
// post /api/v1/product/:id
// middleware owner
router.delete('/:id', protectedMiddleware, ownerMiddleware, deleteProduct);

// Create Data Product
// post /api/v1/product/file-upload
// middleware owner
router.post(
  '/file-upload',
  protectedMiddleware,
  ownerMiddleware,
  upload.single('image'),
  fileUpload
);

export default router;
