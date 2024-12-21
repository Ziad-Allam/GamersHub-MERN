const express = require('express')
const router = express.Router()

const {
    addBanner,
    getBanneres,
    deleteBanner
} = require('../../controller/admin/adminBannerCtrl')

router.route('/add').post(addBanner)
router.route('/get').get(getBanneres)
router.route('/delete/:id').delete(deleteBanner)

module.exports = router;