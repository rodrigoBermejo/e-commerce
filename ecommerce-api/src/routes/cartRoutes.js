const express = require("express");
const { check } = require("express-validator");
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validation");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */

/**
 * @swagger
 * /cart/{userId}:
 *   get:
 *     summary: Retrieve the cart for a specific user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Some server error
 */
router.get(
  "/:userId",
  authMiddleware,
  [check("userId").isMongoId().withMessage("Invalid user ID")],
  validate,
  cartController.getCartByUserId
);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *               - quantity
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Some server error
 */
router.post(
  "/",
  authMiddleware,
  [
    check("userId").isMongoId().withMessage("Invalid user ID"),
    check("productId").isMongoId().withMessage("Invalid product ID"),
    check("quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  validate,
  cartController.addToCart
);

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Cart or product not found
 *       500:
 *         description: Some server error
 */
router.delete(
  "/",
  authMiddleware,
  [
    check("userId").isMongoId().withMessage("Invalid user ID"),
    check("productId").isMongoId().withMessage("Invalid product ID"),
  ],
  validate,
  cartController.removeFromCart
);

/**
 * @swagger
 * /cart/{userId}:
 *   delete:
 *     summary: Clear the cart for a specific user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Some server error
 */
router.delete(
  "/:userId",
  authMiddleware,
  [check("userId").isMongoId().withMessage("Invalid user ID")],
  validate,
  cartController.clearCart
);

module.exports = router;
