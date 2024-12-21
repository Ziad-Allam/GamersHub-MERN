const express = require('express')
const router = express.Router()
const {
    addToWishlist,
    getWishlist
    // updateCartQuantity,
    // deleteCartProducts,
} = require('../controller/wishlistCtrl')

router.route('/add').post(addToWishlist)
router.route('/get/:userId').get(getWishlist)
// router.route('/update-cart').put(updateCartQuantity)
// router.route('/:userId/:productId').delete(deleteCartProducts)


module.exports = router;