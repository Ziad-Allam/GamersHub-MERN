const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    // images: {
    //     type: String,
    //     required: true,
    // },

}, { timestamps: true });

module.exports = mongoose.model('Subcategory', subcategorySchema);
