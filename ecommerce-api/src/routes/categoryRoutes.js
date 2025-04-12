const express = require("express");
const { check } = require("express-validator");
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validation");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Some server error
 */
router.get("/", categoryController.getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Retrieve a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Some server error
 */
router.get(
  "/:id",
  [check("id").isMongoId().withMessage("Invalid category ID")],
  validate,
  categoryController.getCategoryById
);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *               description:
 *                 type: string
 *                 description: A brief description of the category
 *               parentCategory:
 *                 type: string
 *                 description: The ID of the parent category (optional)
 *               imageUrl:
 *                 type: string
 *                 description: The URL of the category image (optional)
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Some server error
 */
router.post(
  "/",
  authMiddleware,
  [
    check("name").notEmpty().withMessage("Category name is required"),
    check("description")
      .notEmpty()
      .withMessage("Category description is required"),
    check("parentCategory")
      .optional()
      .isMongoId()
      .withMessage("Invalid parent category ID"),
    check("imageUrl").optional().isURL().withMessage("Invalid image URL"),
  ],
  validate,
  categoryController.createCategory
);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *               description:
 *                 type: string
 *                 description: A brief description of the category
 *               parentCategory:
 *                 type: string
 *                 description: The ID of the parent category (optional)
 *               imageUrl:
 *                 type: string
 *                 description: The URL of the category image (optional)
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Category not found
 *       500:
 *         description: Some server error
 */
router.put(
  "/:id",
  authMiddleware,
  [
    check("id").isMongoId().withMessage("Invalid category ID"),
    check("name")
      .optional()
      .notEmpty()
      .withMessage("Category name cannot be empty"),
    check("description")
      .optional()
      .notEmpty()
      .withMessage("Category description cannot be empty"),
    check("parentCategory")
      .optional()
      .isMongoId()
      .withMessage("Invalid parent category ID"),
    check("imageUrl").optional().isURL().withMessage("Invalid image URL"),
  ],
  validate,
  categoryController.updateCategory
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Some server error
 */
router.delete(
  "/:id",
  authMiddleware,
  [check("id").isMongoId().withMessage("Invalid category ID")],
  validate,
  categoryController.deleteCategory
);

module.exports = router;
