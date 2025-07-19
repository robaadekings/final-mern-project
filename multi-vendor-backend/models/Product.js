const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    image: String,
    category: { type: String, required: true },  // 👈 simplified for search & categories
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    stock: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
