const Category = require('../../models/categoryModal')
const slugify = require('slugify')
const { cloudinaryDeleteImg } = require('../../cloudinary')

const addCategory = async (req, res, next) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newCategory = await Category.create(req.body)
        console.log('newCategory',newCategory);
        

        res.status(201).json({
            success: true,
            data: {
                newCategory
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
}

const getCategories = async (req, res, next) => {
    try {
        const categoryList = await Category.find()
        
        res.status(200).json({
            success: true,
            length: categoryList.length,
            data: {
                categoryList
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const singleCategory = await Category.findById(id)

        if (!singleCategory) return res.status(404).json({
            success: false,
            message: 'Category with that ID is not found!',
        })

        res.status(200).json({
            success: true,
            data: {
                singleCategory
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id)
        const imageId = category.image.public_id 
        await cloudinaryDeleteImg(imageId)

        const findCategory = await Category.findByIdAndDelete(id)

        if (!findCategory) return res.status(404).json({
            success: false,
            message: 'Category with that ID is not found!',
        })

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        console.log(req.body)

        if (!updatedCategory) return res.status(404).json({
            success: false,
            message: 'Category with that ID is not found!',
        })

        res.status(200).json({
            success: true,
            data: {
                category: updatedCategory
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

module.exports = { 
    addCategory,
    getCategories,
    getCategoryById,
    deleteCategory,
    updateCategory,
}