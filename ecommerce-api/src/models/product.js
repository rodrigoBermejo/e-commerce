const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - category
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         category:
 *           type: string
 *           description: The category ID the product belongs to
 *         stock:
 *           type: number
 *           description: The available stock of the product
 *         imageUrl:
 *           type: string
 *           description: The URL of the product image
 *       example:
 *         id: 1234567890abcdef12345678
 *         name: "Wireless Mouse"
 *         description: "A high-quality wireless mouse"
 *         price: 29.99
 *         category: 9876543210abcdef12345678
 *         stock: 100
 *         imageUrl: "https://example.com/product-image.jpg"
 */

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
