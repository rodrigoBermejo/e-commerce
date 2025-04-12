const Product = require("../models/product");
const errorHandler = require("../middlewares/errorHandler");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.createProduct = async (req, res, next) => {
  const { name, description, price, category, stock, imageUrl } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl: imageUrl || null,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { name, description, price, category, stock, imageUrl } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, stock, imageUrl },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
