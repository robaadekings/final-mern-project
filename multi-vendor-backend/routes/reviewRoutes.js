const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const { createReview, getReviewsByProduct } = require('../controllers/reviewController');

const router = express.Router();

// Customers only can create reviews
router.post('/', protect, allowRoles('customer'), createReview);

// Public: Get all reviews for a product
router.get('/:productId', getReviewsByProduct);

module.exports = router;
