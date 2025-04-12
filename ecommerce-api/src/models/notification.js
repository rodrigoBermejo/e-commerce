const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - userId
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           description: The ID of the user who receives the notification
 *         message:
 *           type: string
 *           description: The notification message
 *         isRead:
 *           type: boolean
 *           description: Whether the notification has been read
 *           default: false
 *       example:
 *         id: 1234567890abcdef12345678
 *         userId: 9876543210abcdef12345678
 *         message: "Your order has been shipped!"
 *         isRead: false
 */

const notificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
