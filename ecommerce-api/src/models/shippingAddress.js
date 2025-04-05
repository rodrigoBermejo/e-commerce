const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shippingAddressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const ShippingAddress = mongoose.model(
  "ShippingAddress",
  shippingAddressSchema
);
module.exports = ShippingAddress;
