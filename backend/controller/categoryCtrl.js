const Category = require('../models/categoryModal')

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

module.exports = { 
    getCategories,
    getCategoryById,
}