import express from "express";
import auth from "../middleware/auth.js";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.js";

const router = express.Router();

// Anyone logged in can read categories
router.get("/", auth, getAllCategories);

// Only admins can create categories
router.post(
  "/",
  auth,
  (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }
    next();
  },
  createCategory
);

//  Update a category (admin only)
router.patch(
  "/:id",
  auth,
  (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }
    next();
  },
  updateCategory
);

// Delete a category (admin only)
router.delete(
  "/:id",
  auth,
  (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }
    next();
  },
  deleteCategory
);

export default router;
