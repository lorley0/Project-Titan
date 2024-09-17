const News = require('../models/News');
const Business = require('../models/Business');

// Create a news post
exports.createNews = async (req, res) => {
    const { headline, content } = req.body;

    try {
        const business = await Business.findById(req.user.businessId);

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        const news = new News({
            business: req.user.businessId,
            headline,
            content,
        });

        await news.save();
        res.status(201).json(news);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all news posts for a business
exports.getNews = async (req, res) => {
    try {
        const news = await News.find({ business: req.params.businessId });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a news post
exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.newsId);

        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }

        if (news.business.toString() !== req.user.businessId) {
            return res.status(401).json({ message: 'Not authorized to delete this news' });
        }

        await news.remove();
        res.json({ message: 'News removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
