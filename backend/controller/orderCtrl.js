const Order = require('../models/orderModel')
const Cart = require('../models/cartModel')
const Product = require('../models/productModel')
const paypal = require('../Payment')

const addOrder = async (req, res) => {
    try {
        const {
            userId,
            cartId,
            totalAmount,
            paymentStatus,
            paymentMethod,
            orderStatus,
            orderUpdateDate,
            paymentId,
            payerId,
            orderDate,
            cartProducts,
            shippingInfo
        } = req.body

        // create a payment JSON. that will help us create paypal payment instance
        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: 'http://localhost:5173/paypal-return',
                cancel_url: 'http://localhost:5173/paypal-cancel'
            },
            transactions: [
                {
                    item_list: {
                        items: cartProducts.map((item) => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity
                        })),
                    },
                    amount: {
                        currency: 'USD',
                        total: totalAmount.toFixed(2)
                    },
                    description: "This is the payment description."
                },
            ],
        };

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.log(error)
                return res.status(500).json({
                    success: false,
                    message: 'Error while creating the payment'
                })
            } else {
                const newOrder = new Order({
                    userId,
                    cartId,
                    totalAmount,
                    paymentStatus,
                    paymentMethod,
                    orderStatus,
                    orderUpdateDate,
                    paymentId,
                    payerId,
                    orderDate,
                    cartProducts,
                    shippingInfo
                })

                await newOrder.save();

                const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url').href;

                res.status(201).json({
                    success: true,
                    data: {
                        approvalURL,
                        orderId: newOrder._id
                    }
                })
            }
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}
// check whether the order is successful or not by the paypal payment info
const capturePayment = async (req, res) => {
    try {

        const { paymentId, payerId, orderId } = req.body

        let order = await Order.findById(orderId)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order cannot be found'
            })
        }

        order.paymentStatus = 'paid';
        order.orderStatus = 'confirmed';
        order.paymentId = paymentId;
        order.payerId = payerId;

        for (let item of order.cartProducts) {
            let product = await Product.findById(item.productId)

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Not enough stock for this product ${product.title}`
                })
            }

            product.totalStock -= item.quantity

            await product.save()
        }

        const getCartId = order.cartId;
        await Cart.findByIdAndDelete(getCartId)

        await order.save()

        res.status(200).json({
            success: true,
            message: 'Order confirmed',
            data: {
                order
            }
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}

const getOrdersByUser = async (req, res) => {
    try {

        const { userId } = req.params

        const orders = await Order.find({ userId })

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: 'No orders found!'
            })
        }

        res.status(200).json({
            success: true,
            data: {
                orders
            }
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}

const getOrderDetails = async (req, res) => {
    try {

        const { id } = req.params

        const order = await Order.findById(id)

        if (!order) {
            res.status(404).json({
                success: false,
                message: 'Order not found!'
            })
        }

        res.status(200).json({
            success: true,
            data: {
                order
            }
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

module.exports = {
    addOrder,
    capturePayment,
    getOrdersByUser,
    getOrderDetails
}