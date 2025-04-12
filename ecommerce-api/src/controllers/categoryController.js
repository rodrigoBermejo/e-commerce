const Category = require("../models/category");
const errorHandler = require("../middlewares/errorHandler");

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate("parentCategory");
    res.status(200).json(categories);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "parentCategory"
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.createCategory = async (req, res, next) => {
  const { name, description, parentCategory, imageUrl } = req.body;

  try {
    const newCategory = new Category({
      name,
      description,
      parentCategory: parentCategory || null,
      imageUrl: imageUrl || null,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.updateCategory = async (req, res, next) => {
  const { name, description, parentCategory, imageUrl } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, parentCategory, imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
