const express = require('express')
const router = express.Router()

const {
    getProductReviews,
    addReview,
} = require('../controller/reviewCtrl')

router.route('/get/:productId').get(getProductReviews)
router.route('/add').post(addReview)
// router.route('/single/:id').get(getSingleCategory)
// router.route('/edit/:id').put(updateCategory)
// router.route('/delete/:id').delete(deleteCategory)

module.exports = router;