const express = require('express')
const authController = require('../controller/userCtrl')
const router = express.Router()

const {
    getOrders,
    getOrderDetails
} = require('../../controller/admin/adminAuthCtrl')

router.route('/login-admin').post(authController.loginAdmin)
router.route('/logout-admin').post(authController.logoutAdmin)

router.route('/check-auth-admin').get(authController.authMiddlewareAdmin, (req, res) => {
    const admin = req.admin;
    res.status(200).json({
        success: true,
        message: 'Authenticated user!',
        admin,
    });
});

module.exports = router;