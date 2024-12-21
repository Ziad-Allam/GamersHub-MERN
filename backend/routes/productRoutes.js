const express = require('express')
const router = express.Router()
const {
    getProducts,
    getProductsByCategory,
    getProductsByBrand,
    getProductDetails
} = require('../controller/productCrtl');

router.route('/get').get(getProducts)
router.route('/get/productsByCategory/:category').get(getProductsByCategory)
router.route('/get/productsByBrand/:brand').get(getProductsByBrand)
router.route('/get/productDetails/:id').get(getProductDetails)

module.exports = router;