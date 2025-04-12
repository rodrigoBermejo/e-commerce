const ShippingAddress = require("../models/shippingAddress");
const errorHandler = require("../middlewares/errorHandler");

exports.getShippingAddressesByUserId = async (req, res, next) => {
  try {
    const addresses = await ShippingAddress.find({ userId: req.params.userId });
    res.status(200).json(addresses);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.createShippingAddress = async (req, res, next) => {
  const { userId, address, city, state, postalCode, country } = req.body;

  try {
    const newAddress = new ShippingAddress({
      userId,
      address,
      city,
      state,
      postalCode,
      country,
    });

    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.updateShippingAddress = async (req, res, next) => {
  const { address, city, state, postalCode, country } = req.body;

  try {
    const updatedAddress = await ShippingAddress.findByIdAndUpdate(
      req.params.id,
      { address, city, state, postalCode, country },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Shipping address not found" });
    }

    res.status(200).json(updatedAddress);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.deleteShippingAddress = async (req, res, next) => {
  try {
    const address = await ShippingAddress.findByIdAndDelete(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Shipping address not found" });
    }
    res.status(200).json({ message: "Shipping address deleted successfully" });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
