const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - userId
 *         - amount
 *         - method
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           description: The ID of the user who made the payment
 *         amount:
 *           type: number
 *           description: The amount paid
 *         method:
 *           type: string
 *           enum: [credit_card, paypal, bank_transfer]
 *           description: The payment method
 *         status:
 *           type: string
 *           enum: [pending, completed, failed]
 *           description: The status of the payment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the payment was created
 *       example:
 *         id: 1234567890abcdef12345678
 *         userId: 9876543210abcdef12345678
 *         amount: 99.99
 *         method: credit_card
 *         status: completed
 *         createdAt: "2025-04-10T10:00:00Z"
 */

const paymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
