const Product = require('../models/Product');

// 📦 Create a product
const createProduct = async (req, res) => {
    try {
        let productData = { ...req.body };
        if (req.user.role === 'admin') {
            productData.approved = true;
            productData.vendor = null;
        } else if (req.user.role === 'vendor') {
            productData.approved = false;
            productData.vendor = req.user._id;
        }
        const product = new Product(productData);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 🔍 Get all products (supports ?search= & ?category=)
const getProducts = async (req, res) => {
    try {
        const { search, category, all } = req.query;

        let query = {};
        if (!all || req.user?.role !== 'admin') {
            query.approved = true;
        }
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }

        const products = await Product.find(query).populate('vendor', 'name');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 📄 Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('vendor', 'name');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✏️ Update a product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Admin can update any product, vendor can only update their own
        if (req.user.role !== 'admin' && product.vendor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        Object.assign(product, req.body);
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🗑️ Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Admin can delete any product, vendor can only delete their own
        if (req.user.role !== 'admin' && product.vendor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Approve a product (admin only)
const approveProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        product.approved = true;
        await product.save();
        res.json({ message: 'Product approved', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    approveProduct,
};
