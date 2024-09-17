const Business = require('../models/Business');

exports.getBusinessAnalytics = async (req, res) => {
    try {
        const { businessId } = req.params;
        const business = await Business.findById(businessId);

        if (!business) {
            return res.status(404).json({ error: 'Business not found' });
        }

        const analytics = {
            totalViews: business.views,
            totalInteractions: business.interactions
        };

        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
