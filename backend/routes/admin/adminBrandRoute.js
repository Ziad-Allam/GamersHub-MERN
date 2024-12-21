const express = require('express')
const router = express.Router()

const {
    addBrand,
    getBrands,
    updateBrand,
    deleteBrand,
} = require('../../controller/admin/adminBrandCtrl')

router.route('/add').post(addBrand)
router.route('/get').get(getBrands)
router.route('/edit/:id').put(updateBrand)
router.route('/delete/:id').delete(deleteBrand)

module.exports = router;