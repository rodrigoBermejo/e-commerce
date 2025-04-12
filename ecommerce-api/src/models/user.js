const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - displayName
 *         - userName
 *         - email
 *         - passwordHash
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the user
 *         displayName:
 *           type: string
 *           description: The full name of the user
 *         userName:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         passwordHash:
 *           type: string
 *           description: The hashed password of the user
 *         role:
 *           type: string
 *           enum: [admin, customer]
 *           description: The role of the user
 *         avatar:
 *           type: string
 *           description: The URL of the user's avatar
 *         phone:
 *           type: string
 *           description: The phone number of the user
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The date of birth of the user
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: Whether the user is active
 *       example:
 *         id: 1234567890abcdef12345678
 *         displayName: John Doe
 *         userName: johndoe
 *         email: johndoe@example.com
 *         passwordHash: $2b$10$eImiTXuWVx0z8Z4g5J9T1O
 *         role: customer
 *         avatar: https://example.com/avatar.png
 *         phone: 1234567890
 *         dateOfBirth: '1990-01-01'
 *         isActive: true
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
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
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
