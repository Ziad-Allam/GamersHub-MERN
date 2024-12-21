const express = require('express')
const router = express.Router()
const { uploadImg } = require('../../cloudinary');
const {
    handleImageUpload,
    handleImageDelete,
    addProduct,
    getAllProducts,
    editProduct,
    deleteProduct,
    getFilteredProducts,
    getProductDetails,
    categoryProducts,
    productsByBrand,
} = require('../../controller/admin/adminProductCtrl');

router.route('/add').post(addProduct)
router.route('/get').get(getAllProducts)
router.route('/edit/:id').put(editProduct)
router.route('/delete/:id').delete(deleteProduct)
router.route('/filtered-products').get(getFilteredProducts)
router.route('/get/:id').get(getProductDetails)
router.route('/get/category-products/:category').get(categoryProducts)
router.route('/get/brand-products/:brand').get(productsByBrand)
router.route('/upload-image').post(uploadImg.single('my_file'), handleImageUpload)
router.route('/delete-image').delete(handleImageDelete);

module.exports = router;