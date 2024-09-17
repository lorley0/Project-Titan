const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationStatus: {
        type: String,
        enum: ['Pending', 'Verified', 'Rejected'],
        default: 'Pending'
    },
    category: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    interactions: {
        type: Number,
        default: 0
    },
    theme: { 
        type: String, default: 'default' 
    },
    additionalDetails: {
        type: String 
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Business', businessSchema);