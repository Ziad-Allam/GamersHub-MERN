const express = require('express')
const router = express.Router()

const {
    getBanneres
} = require('../controller/bannerCtrl')

router.route('/get').get(getBanneres)

module.exports = router;