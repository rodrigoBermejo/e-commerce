const Order = require("../models/order");
const errorHandler = require("../middlewares/errorHandler");

exports.getOrdersByUserId = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate(
      "products.productId"
    );
    res.status(200).json(orders);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.createOrder = async (req, res, next) => {
  const { userId, products, totalPrice } = req.body;

  try {
    const newOrder = new Order({
      userId,
      products,
      totalPrice,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
