const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
    },
    headline: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    postedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('News', newsSchema);
