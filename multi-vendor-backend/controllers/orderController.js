const Order = require('../models/Order');

// Create new order
const createOrder = async (req, res) => {
    try {
        const newOrder = new Order({
            customer: req.user._id,
            vendor: req.body.vendorId,
            items: req.body.items,
            shippingAddress: req.body.shippingAddress,
            totalPrice: req.body.totalPrice,
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get orders for logged-in user
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user._id }).populate('vendor', 'storeName');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Vendor: Get all orders for this vendor
const getVendorOrders = async (req, res) => {
    try {
        const orders = await Order.find({ vendor: req.user._id }).populate('customer', 'name');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order status (Vendor/Admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = req.body.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getVendorOrders,
    updateOrderStatus,
};
