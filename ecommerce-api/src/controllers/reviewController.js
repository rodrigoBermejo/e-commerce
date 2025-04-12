const Review = require("../models/review");
const errorHandler = require("../middlewares/errorHandler");

exports.getReviewsByProductId = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    }).populate("userId");
    res.status(200).json(reviews);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.createReview = async (req, res, next) => {
  const { userId, productId, rating, comment } = req.body;

  try {
    const newReview = new Review({
      userId,
      productId,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
