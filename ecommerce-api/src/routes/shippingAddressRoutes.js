const express = require("express");
const shippingAddressController = require("../controllers/shippingAddressController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ShippingAddresses
 *   description: Shipping address management
 */

/**
 * @swagger
 * /shipping-addresses/{userId}:
 *   get:
 *     summary: Retrieve all shipping addresses for a specific user
 *     tags: [ShippingAddresses]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of shipping addresses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShippingAddress'
 *       500:
 *         description: Some server error
 */
router.get("/:userId", shippingAddressController.getShippingAddressesByUserId);

/**
 * @swagger
 * /shipping-addresses:
 *   post:
 *     summary: Create a new shipping address
 *     tags: [ShippingAddresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - address
 *               - city
 *               - state
 *               - postalCode
 *               - country
 *             properties:
 *               userId:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Shipping address created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShippingAddress'
 *       500:
 *         description: Some server error
 */
router.post("/", shippingAddressController.createShippingAddress);

/**
 * @swagger
 * /shipping-addresses/{id}:
 *   put:
 *     summary: Update a shipping address by ID
 *     tags: [ShippingAddresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The shipping address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Shipping address updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShippingAddress'
 *       404:
 *         description: Shipping address not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", shippingAddressController.updateShippingAddress);

/**
 * @swagger
 * /shipping-addresses/{id}:
 *   delete:
 *     summary: Delete a shipping address by ID
 *     tags: [ShippingAddresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The shipping address ID
 *     responses:
 *       200:
 *         description: Shipping address deleted successfully
 *       404:
 *         description: Shipping address not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", shippingAddressController.deleteShippingAddress);

module.exports = router;
