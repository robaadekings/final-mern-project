const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const {
    createOrder,
    getMyOrders,
    getVendorOrders,
    updateOrderStatus,
} = require('../controllers/orderController');

const router = express.Router();

// Customers
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);

// Vendors
router.get('/vendor-orders', protect, allowRoles('vendor'), getVendorOrders);
router.put('/:id/status', protect, allowRoles('vendor'), updateOrderStatus);

module.exports = router;
