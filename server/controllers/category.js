// // server/controllers/category.js
// import Category from '../models/Category.js';

// export const getAllCategories = async (req, res) => {
//   try {
//     const cats = await Category.find();
//     res.json(cats);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Could not fetch categories' });
//   }
// };

// export const createCategory = async (req, res) => {
//   try {
//     // only admin should reach here (see middleware)
//     const { name, image } = req.body;
//     const cat = await Category.create({ name, image });
//     res.status(201).json(cat);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Could not create category' });
//   }
// };

// export const updateCategory = async (req, res) => {
//   const { name, image } = req.body;
//   const cat = await Category.findByIdAndUpdate(
//     req.params.id,
//     { name, image },
//     { new: true }
//   );
//   if (!cat) return res.status(404).json({ message: "Not found" });
//   res.json(cat);
// };

// export const deleteCategory = async (req, res) => {
//   const cat = await Category.findByIdAndDelete(req.params.id);
//   if (!cat) return res.status(404).json({ message: "Not found" });
//   res.json({ message: "Deleted successfully" });
// };
// server/controllers/category.js
import Category from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  try {
    const cats = await Category.find();
    res.json(cats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not fetch categories" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, image, group } = req.body; // ✅ Include group
    const cat = await Category.create({ name, image, group }); // ✅ Save group
    res.status(201).json(cat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not create category" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, image, group } = req.body; // ✅ Include group
    const cat = await Category.findByIdAndUpdate(
      req.params.id,
      { name, image, group }, // ✅ Update group
      { new: true }
    );
    if (!cat) return res.status(404).json({ message: "Not found" });
    res.json(cat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not update category" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const cat = await Category.findByIdAndDelete(req.params.id);
    if (!cat) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not delete category" });
  }
};
