const express = require('express');
const { createNews, getNews, deleteNews } = require('../controllers/newsController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/:businessId').get(getNews);
router.route('/').post(protect, createNews);
router.route('/:newsId').delete(protect, deleteNews);

module.exports = router;
