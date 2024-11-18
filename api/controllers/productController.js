const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = new Product({ name, description, price });
    await product.save();
    res.status(201).json({ success: true, message: 'Product added successfully', product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
