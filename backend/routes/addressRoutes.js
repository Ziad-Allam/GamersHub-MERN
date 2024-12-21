const express = require('express')
const router = express.Router()
const {
    getAddresses,
    addAddress,
    editAddress,
    deleteAddress,
} = require('../controller/addressCtrl');

router.route('/get/:userId').get(getAddresses)
router.route('/add').post(addAddress)
router.route('/edit/:userId/:addressId').put(editAddress)
router.route('/delete/:userId/:addressId').delete(deleteAddress)

module.exports = router;