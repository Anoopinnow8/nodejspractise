const express = require('express');
const { addProduct, getAllProducts } = require('../controllers/productController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authenticate, addProduct);
router.get('/all', authenticate, getAllProducts);

module.exports = router;
