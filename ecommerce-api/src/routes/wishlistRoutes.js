const express = require("express");
const wishlistController = require("../controllers/wishlistController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Wishlists
 *   description: Wishlist management
 */

/**
 * @swagger
 * /wishlists/{userId}:
 *   get:
 *     summary: Retrieve the wishlist for a specific user
 *     tags: [Wishlists]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Wishlist retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       404:
 *         description: Wishlist not found
 *       500:
 *         description: Some server error
 */
router.get("/:userId", wishlistController.getWishlistByUserId);

/**
 * @swagger
 * /wishlists:
 *   post:
 *     summary: Add a product to the wishlist
 *     tags: [Wishlists]
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
 *         description: Product added to wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       500:
 *         description: Some server error
 */
router.post("/", wishlistController.addToWishlist);

/**
 * @swagger
 * /wishlists:
 *   delete:
 *     summary: Remove a product from the wishlist
 *     tags: [Wishlists]
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
 *         description: Product removed from wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       404:
 *         description: Wishlist not found
 *       500:
 *         description: Some server error
 */
router.delete("/", wishlistController.removeFromWishlist);

/**
 * @swagger
 * /wishlists/{userId}:
 *   delete:
 *     summary: Clear the wishlist for a specific user
 *     tags: [Wishlists]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Wishlist cleared successfully
 *       404:
 *         description: Wishlist not found
 *       500:
 *         description: Some server error
 */
router.delete("/:userId", wishlistController.clearWishlist);

module.exports = router;
