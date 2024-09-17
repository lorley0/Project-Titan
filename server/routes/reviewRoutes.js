const express = require('express');
const { createReview, getReviews, deleteReview } = require('../controllers/reviewController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/:businessId').post(protect, createReview).get(getReviews);
router.route('/:reviewId').delete(protect, deleteReview);

module.exports = router;
