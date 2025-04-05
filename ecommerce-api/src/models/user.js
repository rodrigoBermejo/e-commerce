const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userName
 *         - displayName
 *         - email
 *         - passwordHash
 *         - role
 *       properties:
 *         userName:
 *           type: string
 *           description: The username of the user
 *         displayName:
 *           type: string
 *           description: The display name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         passwordHash:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: string
 *           enum: ['Admin', 'Customer']
 *           description: The role of the user
 *         example:
 *         userId: 60d0fe4f5311236168a109ca
 *         userName: johndoe
 *         displayName: John Doe
 *         email: johndoe@example.com
 *         passwordHash: password123
 *         role: Admin
 */
const userSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    avatar: {
      type: String,
      default: "https://example.com/default-avatar.png",
    },
    phone: {
      type: String,
      default: null,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
