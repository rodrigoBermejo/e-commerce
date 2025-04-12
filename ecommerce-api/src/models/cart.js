const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - userId
 *         - products
 *         - totalPrice
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user who owns the cart
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
 *           description: Total price of the cart
 *       example:
 *         userId: 1234567890abcdef12345678
 *         products:
 *           - productId: 9876543210abcdef12345678
 *             quantity: 2
 *         totalPrice: 49.99
 */

const cartSchema = new Schema(
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
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
