// server/controllers/product.js
import Product from "../models/Product.js";

export const getProductsByCategory = async (req, res) => {
  try {
    const { catId } = req.params;
    const prods = await Product.find({ category: catId });
    res.json(prods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not fetch products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product); // Return single object
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching product" });
  }
};
