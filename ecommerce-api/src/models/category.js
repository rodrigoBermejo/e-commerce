const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         description:
 *           type: string
 *           description: A brief description of the category
 *         parentCategory:
 *           type: string
 *           description: The ID of the parent category (if any)
 *         imageUrl:
 *           type: string
 *           description: The URL of the category image
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the category was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the category was last updated
 *       example:
 *         id: 1234567890abcdef12345678
 *         name: "Electronics"
 *         description: "Category for electronic products"
 *         parentCategory: null
 *         imageUrl: "https://example.com/category-image.jpg"
 *         createdAt: "2025-04-10T10:00:00Z"
 *         updatedAt: "2025-04-10T12:00:00Z"
 */

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
