const express = require("express");
const { param, body, query } = require("express-validator");
const validate = require("../middlewares/validation");
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/user", authMiddleware, userController.getUsers);

router.get(
  "/user/:id",
  [param("id").isMongoId().withMessage("Invalid user ID format")],
  authMiddleware,
  validate,
  userController.getUserById
);

router.post(
  "/user",
  [
    body("userName").notEmpty().withMessage("User name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  authMiddleware,
  validate,
  userController.createUser
);

router.put(
  "/user/:id",
  [
    param("id").isMongoId().withMessage("Invalid user ID"),
    body("userName").optional().notEmpty().withMessage("User name is required"),
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  authMiddleware,
  validate,
  userController.updateUser
);

router.delete(
  "/user/:id",
  [param("id").isMongoId().withMessage("Invalid user ID format")],
  authMiddleware,
  validate,
  userController.deleteUser
);

module.exports = router;
