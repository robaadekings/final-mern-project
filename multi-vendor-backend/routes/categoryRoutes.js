const express = require('express');
const { createCategory, getCategories, deleteCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Admin only
router.post('/', protect, allowRoles('admin'), createCategory);
router.delete('/:id', protect, allowRoles('admin'), deleteCategory);

// Public
router.get('/', getCategories);

module.exports = router;
