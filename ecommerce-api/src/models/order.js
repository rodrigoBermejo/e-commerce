const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - userId
 *         - products
 *         - totalPrice
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           description: The ID of the user who placed the order
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product
 *         totalPrice:
 *           type: number
 *           description: Total price of the order
 *         status:
 *           type: string
 *           enum: [pending, processing, shipped, delivered, cancelled]
 *           description: The status of the order
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was created
 *       example:
 *         id: 1234567890abcdef12345678
 *         userId: 9876543210abcdef12345678
 *         products:
 *           - productId: 9876543210abcdef12345678
 *             quantity: 2
 *         totalPrice: 99.99
 *         status: pending
 *         createdAt: "2025-04-10T10:00:00Z"
 */

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
