const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
        productId: String,
        userId: String,
        userName: String,
        message: String,
        rating: Number
    },
    { timestamps: true }
)

module.exports = mongoose.model('Review', ReviewSchema)