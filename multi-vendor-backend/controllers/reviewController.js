const Review = require('../models/Review');
const Product = require('../models/Product');

// Create Review and Update Product Rating / Num Reviews
const createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        // Prevent multiple reviews by same user on same product
        const existingReview = await Review.findOne({
            user: req.user._id,
            product: productId,
        });

        if (existingReview) {
            return res.status(400).json({ message: 'You already reviewed this product' });
        }

        const review = new Review({
            user: req.user._id,
            product: productId,
            rating,
            comment,
        });

        await review.save();

        // Recalculate average rating and review count
        const reviews = await Review.find({ product: productId });
        const numReviews = reviews.length;
        const averageRating =
            reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews;

        await Product.findByIdAndUpdate(productId, {
            numReviews,
            averageRating,
        });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Reviews for a Product
const getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ product: productId }).populate('user', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createReview,
    getReviewsByProduct,
};
