const Payment = require("../models/payment");
const errorHandler = require("../middlewares/errorHandler");

exports.getPaymentsByUserId = async (req, res, next) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId });
    res.status(200).json(payments);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.createPayment = async (req, res, next) => {
  const { userId, amount, method } = req.body;

  try {
    const newPayment = new Payment({
      userId,
      amount,
      method,
    });

    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.updatePaymentStatus = async (req, res, next) => {
  const { status } = req.body;

  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.deletePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
