const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    approveProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles, isVendor, isAdmin } = require('../middleware/roleMiddleware');
const { upload } = require('../middleware/uploadMiddleware');
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

// ��️ Protected (Vendor and Admin) routes
router.post('/', protect, allowRoles('admin', 'vendor'), upload.single('image'), createProduct);
router.put('/:id', protect, allowRoles('admin', 'vendor'), updateProduct);
router.delete('/:id', protect, allowRoles('admin', 'vendor'), deleteProduct);
router.put('/:id/approve', protect, isAdmin, approveProduct);

module.exports = router;
