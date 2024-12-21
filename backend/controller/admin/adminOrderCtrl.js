const Order = require('../../models/orderModel')

const getOrders = async (req, res) => {
    try {

        const orders = await Order.find({})

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
    getOrders,
    getOrderDetails
}