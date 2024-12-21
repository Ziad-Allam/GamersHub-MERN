const express = require('express')
const router = express.Router()
const {
    addToCart,
    getCartitems,
    updateCartItemQuantity,
    deleteCartitem,
} = require('../controller/cartCtrl')

router.route('/add').post(addToCart)
router.route('/get/:userId').get(getCartitems)
router.route('/edit/updateItemQty').put(updateCartItemQuantity)
router.route('/delete/:userId/:productId').delete(deleteCartitem)

module.exports = router;