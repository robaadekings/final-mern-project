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
const { allowRoles } = require('../middleware/roleMiddleware');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected routes for vendors only
router.post('/', protect, allowRoles('vendor'), createProduct);
router.put('/:id', protect, allowRoles('vendor'), updateProduct);
router.delete('/:id', protect, allowRoles('vendor'), deleteProduct);

module.exports = router;
