import express from "express";
import auth from "../middleware/auth.js";
import {
  getProductsByCategory,
  getProductById,
} from "../controllers/product.js";

const router = express.Router();

// Any authenticated user can list products in a category
router.get("/:catId", auth, getProductsByCategory);
// Get single product by ID
router.get("/single/:id",getProductById);

export default router;
