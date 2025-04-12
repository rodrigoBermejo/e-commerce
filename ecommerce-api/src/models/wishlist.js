const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       required:
 *         - userId
 *         - products
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           description: The ID of the user who owns the wishlist
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product
 *               addedAt:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the product was added to the wishlist
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the wishlist was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the wishlist was last updated
 *       example:
 *         id: 1234567890abcdef12345678
 *         userId: 9876543210abcdef12345678
 *         products:
 *           - productId: 1234567890abcdef12345678
 *             addedAt: "2025-04-10T10:00:00Z"
 *         createdAt: "2025-04-10T10:00:00Z"
 *         updatedAt: "2025-04-10T12:00:00Z"
 */

const wishlistSchema = new Schema(
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
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
