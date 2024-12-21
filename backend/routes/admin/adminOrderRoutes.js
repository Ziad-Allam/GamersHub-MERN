const express = require('express');
const router = express.Router()
const {
    getOrders,
    getOrderDetails
} = require('../../controller/admin/adminOrderCtrl')

router.route('/get').get(getOrders)
router.route('/get/ordrDetails/:id').get(getOrderDetails)

module.exports = router;