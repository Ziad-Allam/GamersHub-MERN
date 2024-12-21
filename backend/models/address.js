const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    fullName: {
        type: String,
        required: true,
    },
    streetName: {
        type: String,
        required: true,
    },
    buildingNo: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    landmark: {
        type: String,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('Address', addressSchema)