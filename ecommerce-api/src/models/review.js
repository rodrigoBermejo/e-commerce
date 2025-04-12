const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *         - rating
 *         - comment
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           description: The ID of the user who wrote the review
 *         productId:
 *           type: string
 *           description: The ID of the product being reviewed
 *         rating:
 *           type: number
 *           description: The rating given to the product
 *           minimum: 1
 *           maximum: 5
 *         comment:
 *           type: string
 *           description: The review comment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the review was created
 *       example:
 *         id: 1234567890abcdef12345678
 *         userId: 9876543210abcdef12345678
 *         productId: 1234567890abcdef12345678
 *         rating: 5
 *         comment: "Excellent product!"
 *         createdAt: "2025-04-10T10:00:00Z"
 */

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
