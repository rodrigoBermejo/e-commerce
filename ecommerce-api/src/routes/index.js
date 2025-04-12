const express = require("express");

const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const cartRoutes = require("./cartRoutes");
const categoryRoutes = require("./categoryRoutes");
const paymentRoutes = require("./paymentRoutes");
const reviewRoutes = require("./reviewRoutes");
const shippingAddressRoutes = require("./shippingAddressRoutes");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 *   - name: Products
 *     description: Product management
 *   - name: Orders
 *     description: Order management
 *   - name: Wishlists
 *     description: Wishlist management
 *   - name: Cart
 *     description: Cart management
 *   - name: Categories
 *     description: Category management
 *   - name: Payments
 *     description: Payment management
 *   - name: Reviews
 *     description: Review management
 *   - name: ShippingAddresses
 *     description: Shipping address management
 */

// Register all routes
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/wishlists", wishlistRoutes);
router.use("/cart", cartRoutes);
router.use("/categories", categoryRoutes);
router.use("/payments", paymentRoutes);
router.use("/reviews", reviewRoutes);
router.use("/shipping-addresses", shippingAddressRoutes);

module.exports = router;
