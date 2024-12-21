const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: String,
        cartId: String,
        totalAmount: Number,
        paymentStatus: String,
        paymentMethod: String,
        orderStatus: String,
        orderUpdateDate: Date,
        paymentId: String,
        payerId: String,
        orderDate: {
            type: Date,
            default: Date.now()
        },
        cartProducts: [
            {
                productId: String,
                title: String,
                image: {
                    url: {
                        type: String,
                    },            
                },
                quantity: Number,
                price: Number,
            }
        ],
        shippingInfo: {
            fullName: String,
            streetName: String,
            buildingNo: Number,
            city: String,
            phone: Number,
            landmark: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);