const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
        // index: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    image: {
        url: { 
            type: String, 
            required: true 
        },
        public_id: { 
            type: String, 
            required: true 
        }
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Brand', brandSchema)