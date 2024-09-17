const Review = require('../models/Review');
const Business = require('../models/Business');

exports.createReview = async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const business = await Business.findById(req.params.businessId);

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        const review = new Review({
            user: req.user.id,
            business: req.params.businessId,
            rating,
            comment,
        });

        await review.save();

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ business: req.params.businessId }).populate('user', 'name');

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this review' });
        }

        await review.remove();

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};