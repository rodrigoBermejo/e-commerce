const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     ShippingAddress:
 *       type: object
 *       required:
 *         - userId
 *         - address
 *         - city
 *         - state
 *         - postalCode
 *         - country
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the shipping address
 *         address:
 *           type: string
 *           description: The street address
 *         city:
 *           type: string
 *           description: The city of the shipping address
 *         state:
 *           type: string
 *           description: The state of the shipping address
 *         postalCode:
 *           type: string
 *           description: The postal code of the shipping address
 *         country:
 *           type: string
 *           description: The country of the shipping address
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the shipping address was created
 *       example:
 *         id: 1234567890abcdef12345678
 *         userId: 9876543210abcdef12345678
 *         address: "123 Main St"
 *         city: "New York"
 *         state: "NY"
 *         postalCode: "10001"
 *         country: "USA"
 *         createdAt: "2025-04-10T10:00:00Z"
 */

const shippingAddressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      required: true,
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
