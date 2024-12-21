const express = require('express')
const router = express.Router()

const {
    addCategory,
    getCategories,
    getCategoryById,
    deleteCategory,
    updateCategory,
} = require('../../controller/admin/adminCategoryCtrl')

router.route('/add').post(addCategory)
router.route('/get').get(getCategories)
router.route('/get/:id').get(getCategoryById)
router.route('/update/:id').put(updateCategory)
router.route('/delete/:id').delete(deleteCategory)

module.exports = router;