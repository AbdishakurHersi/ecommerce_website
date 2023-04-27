import { query } from "express";
import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";
import Category from "../model/Category.js";
import Brand from "../model/Brand.js";

export const createProductController = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, description, category, sizes, colors, price, totalQty, brand } =
    req.body;
  const convertedImgs = req.files.map((file) => file?.path);
  //Product exists
  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Error("Product Already Exists");
  }
  //find the brand
  const brandFound = await Brand.findOne({
    name: "addidas",
  });

  if (!brandFound) {
    throw new Error(
      "Brand not found, please create brand first or check brand name"
    );
  }
  //find the category
  const categoryFound = await Category.findOne({
    name: category,
  });
  if (!categoryFound) {
    throw new Error(
      "Category not found, please create category first or check category name"
    );
  }
  //create the product
  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    brand,
    images: convertedImgs,
  });
  //push the product into category
  categoryFound.products.push(product._id);
  //resave
  await categoryFound.save();
  //push the product into brand
  brandFound.products.push(product._id);
  //resave
  await brandFound.save();
  //send response
  res.json({
    status: "success",
    message: "Product created successfully",
    product,
  });
});

export const getProductsController = asyncHandler(async (req, res) => {
  let productQuery = product.find();

  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }
  if (req.query.colors) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.colors, $options: "i" },
    });
  }
  if (req.query.sizes) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.sizes, $options: "i" },
    });
  }
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    //gte:greater than or equal to
    //lte:less than or equal to
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }
  //pagination
  //page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  //limit
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  //startindex
  const startIndex = (page - 1) * limit;
  //endIndex
  const endIndex = page * limit;
  //totalproduct
  const total = await Product.countDocuments();
  productQuery = productQuery.skip(startIndex).limit(limit);
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  const products = await productQuery;
  res.json({
    status: "success",
    total,
    results: products.length,
    pagination,
    message: "Products fetched successfully",
    products,
  });
});

export const getProductController = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new Error("product not found");
  }
  res.json({
    status: "success",
    msg: "Product fetched successfully",
    product,
  });
});

export const updateProductController = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
      brand,
    },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    msg: "Product updated successfully",
    product,
  });
});

export const deleteProductController = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    msg: "Product deleted successfully",
  });
});
