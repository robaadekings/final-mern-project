const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles, isVendor } = require('../middleware/roleMiddleware');
const Product = require('../models/Product');

// 🛍️ Vendor-specific dashboard (only vendor sees their products)
router.get('/vendor', protect, isVendor, async (req, res) => {
    try {
        const products = await Product.find({ vendor: req.user._id });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch vendor products' });
    }
});

// 🌍 Public routes (with support for ?search= & category=)
router.get('/', getProducts);
router.get('/:id', getProductById);

// 🛡️ Protected (Vendor-only) routes
router.post('/', protect, allowRoles('vendor'), createProduct);
router.put('/:id', protect, allowRoles('vendor'), updateProduct);
router.delete('/:id', protect, allowRoles('vendor'), deleteProduct);

module.exports = router;
