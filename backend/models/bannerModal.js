const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Banner', bannerSchema)