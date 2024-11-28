import express from "express";
import Category from "../models/category.js";
import News from "../models/news.js";

const router = express.Router();

// Create
router.post("/category", async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read 
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
});

// Update
router.put("/category/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id, 
      { name }, 
      { new: true } 
    );
    res.json(updatedCategory); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
});

// Delete 
router.delete("/category/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;


    await News.deleteMany({ category: categoryId });

    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    res.json(deletedCategory); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
});

export default router; 