const Order = require('../models/Order');

// Create new order
const createOrder = async (req, res) => {
    try {
        console.log('REQ.BODY:', req.body);
        console.log('REQ.USER:', req.user);

        const { items, shippingAddress, totalPrice } = req.body;

        // Validate input
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Order must include at least one item.' });
        }

        if (!shippingAddress || typeof shippingAddress !== 'object') {
            return res.status(400).json({ message: 'Shipping address is required and must be an object.' });
        }

        if (!totalPrice || typeof totalPrice !== 'number') {
            return res.status(400).json({ message: 'Total price is required and must be a number.' });
        }

        const newOrder = new Order({
            customer: req.user._id,
            items,
            shippingAddress,
            totalPrice,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('CREATE ORDER ERROR:', error);
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};

// Get orders for logged-in user
const getMyOrders = async (req, res) => {
    try {
        console.log('Fetching orders for user:', req.user._id);
        const orders = await Order.find({ customer: req.user._id });
        res.json(orders);
    } catch (error) {
        console.error('GET MY ORDERS ERROR:', error);
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        console.log('Updating order status for order ID:', req.params.id);

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = req.body.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        console.error('UPDATE ORDER STATUS ERROR:', error);
        res.status(500).json({ message: 'Failed to update order status', error: error.message });
    }
};

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('customer', 'name email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};

// Get orders for vendor's products
const getVendorOrders = async (req, res) => {
    try {
        // Find orders where any item.productId is a product owned by this vendor
        const Product = require('../models/Product');
        const vendorProducts = await Product.find({ vendor: req.user._id }).select('_id');
        const vendorProductIds = vendorProducts.map(p => p._id.toString());
        const orders = await Order.find({ 'items.productId': { $in: vendorProductIds } }).populate('customer', 'name email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch vendor orders' });
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    updateOrderStatus,
    getAllOrders,
    getVendorOrders,
};
