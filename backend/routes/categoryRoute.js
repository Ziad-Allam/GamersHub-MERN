const express = require('express')
const router = express.Router()

const {
    getCategories,
    getCategoryById,
} = require('../controller/categoryCtrl')

router.route('/get').get(getCategories)
router.route('/get/:id').get(getCategoryById)

module.exports = router;