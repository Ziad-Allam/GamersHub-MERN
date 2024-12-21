const express = require('express')
const authController = require('../controller/userCtrl')
const router = express.Router()

const {
    createUser,
    loginUser,
    loginAdmin,
    logoutUser,
    logoutAdmin,
    authMiddleware,
    authMiddlewareAdmin,
    getUsers,
    getAdmins,
} = require('../controller/userCtrl')

router.route('/register').post(createUser)
router.route('/login').post(loginUser)
router.route('/login-admin').post(loginAdmin)
router.route('/logout').post(logoutUser)
router.route('/logout-admin').post(logoutAdmin)
router.route('/get/users').get(getUsers)
router.route('/get/admins').get(getAdmins)
router.route('/check-auth').get(authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: 'Authenticated user!',
        user,
    });
});
router.route('/check-auth-admin').get(authMiddlewareAdmin, (req, res) => {
    const admin = req.admin;
    res.status(200).json({
        success: true,
        message: 'Authenticated user!',
        admin,
    });
});

module.exports = router;