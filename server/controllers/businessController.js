const Business = require('../models/Business');
const { sendEmailNotification, createInAppNotification } = require('./notificationController');

// Create a new business
exports.addBusiness = async (req, res) => {
    try {
        const { name, description, address } = req.body;
        const newBusiness = new Business({
            name,
            description,
            address,
            owner: req.user.id,
        });
        const business = await newBusiness.save();
        res.json(business);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all businesses
exports.getBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find();
        res.json(businesses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Create a new business
exports.createBusiness = async (req, res) => {
    try {
        const { name, description, address } = req.body;
        const business = new Business({
            name,
            description,
            address,
            user: req.user.id,
        });

        await business.save();
        res.status(201).json(business);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all businesses
exports.getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find();
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a business
exports.updateBusiness = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);

        if (business.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to update this business' });
        }

        const { name, description, address } = req.body;
        business.name = name || business.name;
        business.description = description || business.description;
        business.address = address || business.address;

        const updatedBusiness = await business.save();
        res.json(updatedBusiness);
    } catch (error) {
        res.status(404).json({ message: 'Business not found' });
    }
};

// Delete a business
exports.deleteBusiness = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);

        if (business.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this business' });
        }

        await business.remove();
        res.json({ message: 'Business removed' });
    } catch (error) {
        res.status(404).json({ message: 'Business not found' });
    }
};

// Verify a business
exports.verifyBusiness = async (req, res) => {
    try {
        const businessId = req.params.id;
        const business = await Business.findById(businessId);

        if (!business) {
            return res.status(404).json({ error: 'Business not found' });
        }

        // Here you would normally process the uploaded document
        // For simplicity, let's just mark the business as "Pending Verification"
        business.verificationStatus = 'Pending';
        await business.save();

        res.json({ message: 'Verification request submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getBusinesses = async (req, res) => {
    try {
        const { category } = req.query;
        let businesses;

        if (category) {
            businesses = await Business.find({ category });
        } else {
            businesses = await Business.find({});
        }

        res.json(businesses);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getBusinessById = async (req, res) => {
    try {
        const { id } = req.params;
        const business = await Business.findById(id);

        if (!business) {
            return res.status(404).json({ error: 'Business not found' });
        }

        // Increment views count
        business.views += 1;
        await business.save();

        res.json(business);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.addReview = async (req, res) => {
    try {
        const { id } = req.params;
        const business = await Business.findById(id);
        const user = await User.findById(req.user.id);

        if (!business) {
            return res.status(404).json({ error: 'Business not found' });
        }

        const newReview = {
            user: req.user.id,
            rating: req.body.rating,
            comment: req.body.comment,
        };

        business.reviews.push(newReview);
        await business.save();

        // Send notification to business owner
        const businessOwner = await User.findById(business.owner);
        if (businessOwner) {
            const message = `Your business "${business.name}" has received a new review.`;
            await sendEmailNotification(businessOwner.email, 'New Review', message);
            await createInAppNotification(businessOwner._id, message);
        }

        res.json(business);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateBusinessCustomization = async (req, res) => {
    const { id } = req.params;
    const { theme, additionalDetails } = req.body;

    try {
        const business = await Business.findById(id);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        business.theme = theme;
        business.additionalDetails = additionalDetails;
        await business.save();

        res.status(200).json({ message: 'Customization updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
