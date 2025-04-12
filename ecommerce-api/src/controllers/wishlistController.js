const Wishlist = require("../models/wishlist");
const errorHandler = require("../middlewares/errorHandler");

exports.getWishlistByUserId = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({
      userId: req.params.userId,
    }).populate("products.productId");
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.addToWishlist = async (req, res, next) => {
  const { userId, productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        products: [{ productId }],
      });
    } else {
      const productExists = wishlist.products.some(
        (p) => p.productId.toString() === productId
      );
      if (!productExists) {
        wishlist.products.push({ productId });
      }
    }

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  const { userId, productId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (p) => p.productId.toString() !== productId
    );
    await wishlist.save();

    res.status(200).json(wishlist);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.clearWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOneAndDelete({
      userId: req.params.userId,
    });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json({ message: "Wishlist cleared successfully" });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
