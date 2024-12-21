const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    // subcategory: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Subcategory',
    // },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
    totalStock: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    },
    salePrice: {
        type: Number,
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
    },
    averageRating: Number,
    sold: {
        type: Number,
        default: 0,
    },
},
    { timestamps: true }
);

// productSchema.pre('save', function (next) {
//     if (this.discount > 0) {
//         this.featured = true;
//     }
//     next();
// });

module.exports = mongoose.model('Product', productSchema)