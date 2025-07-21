const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const {
    createOrder,
    getMyOrders,
    updateOrderStatus,
    getAllOrders,
    getVendorOrders,
} = require('../controllers/orderController');

const router = express.Router();

// Customers create orders and get their own orders
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/admin', protect, allowRoles('admin'), getAllOrders);
router.get('/vendor', protect, allowRoles('vendor'), getVendorOrders);

// Vendors (and possibly admins) update order status
router.put('/:id/status', protect, allowRoles('vendor'), updateOrderStatus);

module.exports = router;
