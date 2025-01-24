import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

export const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  return res.status(201).json({
    message: 'Add Product Success',
    data: newProduct,
  });
});

export const allProduct = asyncHandler(async (req, res) => {
  // Req Query
  const queryObj = { ...req.query };

  // Fungsi untuk mengabaikan jika ada req page dan limit
  const excludeField = ['page', 'limit', 'name'];
  excludeField.forEach((element) => delete queryObj[element]);

  let query;
  if (req.query.name) {
    query = Product.find({
      name: { $regex: req.query.name, $options: 'i' },
    });
  } else {
    query = Product.find(queryObj);
  }

  // Pagination
  const page = req.query.page * 1 || 1;
  const limitData = req.query.limit * 1 || 8;
  const skipData = (page - 1) * limitData;

  query = query.skip(skipData).limit(limitData);

  let countProduct = await Product.countDocuments(queryObj);
  if (req.query.page) {
    if (skipData >= countProduct) {
      res.status(404);
      throw new Error('This Page doesnt exist');
    }
  }

  const products = await query;
  const totalPage = Math.ceil(countProduct / limitData);

  return res.status(200).json({
    message: 'Products Show Success',
    data: products,
    pagination: {
      totalPage,
      page,
      totalProduct: countProduct,
    },
  });
});

export const detailProduct = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;
  const product = await Product.findById(paramsId);

  if (!product) {
    res.status(404);
    throw new Error('Product Id not found');
  }

  return res.status(200).json({
    message: 'Product Detail Show Success',
    product,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;
  const updateProduct = await Product.findByIdAndUpdate(paramsId, req.body, {
    runValidators: false,
    new: true,
  });

  return res.status(201).json({
    message: 'Product Update Success',
    data: updateProduct,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;
  await Product.findByIdAndDelete(paramsId, {
    translateAliases: null,
  });

  return res.status(201).json({
    message: 'Product Delete Success',
  });
});

export const fileUpload = asyncHandler(async (req, res) => {
  // const file = req.file;
  // if (!file) {
  //   res.status(400);
  //   throw new Error('Tidak ada file yang diupload');
  // }

  // const imageFileName = file.filename;
  // const pathImageFile = `/uploads/${imageFileName}`;

  // res.status(200).json({
  //   message: 'Image successed Upload',
  //   image: pathImageFile,
  // });

  const stream = cloudinary.uploader.upload_stream(
    {
      folder: 'uploads',
      allowed_formats: ['jpg', 'png'],
    },
    function (err, result) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: 'Failed to upload image', error: err });
      }

      res.json({ message: 'Image succesful upload', url: result.secure_url });
    }
  );
  streamifier.createReadStream(req.file.buffer).pipe(stream);
});
