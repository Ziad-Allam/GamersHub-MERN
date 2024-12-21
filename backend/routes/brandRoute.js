const express = require('express')
const router = express.Router()

const {
    // addBrand,
    getBrands,
    // getBrandById,
    // updateBrand,
    // deleteBrand,
} = require('../controller/brandCtrl')

// router.route('/create').post(addBrand)
router.route('/get').get(getBrands)
// router.route('/single/:id').get(getBrandById)
// router.route('/edit/:id').put(updateBrand)
// router.route('/delete/:id').delete(deleteBrand)

module.exports = router;