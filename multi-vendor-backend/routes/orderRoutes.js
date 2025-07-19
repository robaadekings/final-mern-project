const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const {
    createOrder,
    getMyOrders,
    updateOrderStatus,
} = require('../controllers/orderController');

const router = express.Router();

// Customers create orders and get their own orders
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);

// Vendors (and possibly admins) update order status
router.put('/:id/status', protect, allowRoles('vendor'), updateOrderStatus);

module.exports = router;
