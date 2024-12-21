const express = require('express');
const router = express.Router()
const {
    addOrder,
    capturePayment,
    getOrdersByUser,
    getOrderDetails
} = require('../controller/orderCtrl')

router.route('/add').post(addOrder)
router.route('/capture').post(capturePayment)
router.route('/get/:userId').get(getOrdersByUser)
router.route('/details/:id').get(getOrderDetails)

module.exports = router;