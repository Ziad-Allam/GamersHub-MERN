const Brand = require('../../models/brandModel')
const { default: slugify } = require('slugify');
const { cloudinaryDeleteImg } = require('../../cloudinary');

const addBrand = async (req, res, next) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newBrand = await Brand.create(req.body)

        res.status(201).json({
            success: true,
            data: {
                newBrand
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

const getBrands = async (req, res, next) => {
    try {
        const brandList = await Brand.find();

        res.status(200).json({
            success: true,
            length: brandList.length,
            data: {
                brandList
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

const deleteBrand = async (req, res, next) => {
    try {
        const { id } = req.params;

        const brand = await Brand.findById(id)
        const imageId = brand.image.public_id
        await cloudinaryDeleteImg(imageId)

        const findBrand = await Brand.findByIdAndDelete(id)

        if (!findBrand) {
            return res.status(404).json({
                success: false,
                message: "Brand with that ID is not found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "Brand deleted successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

const updateBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

        if (!updatedBrand) {
            return res.status(404).json({
                success: false,
                message: "Brand with that ID is not found!",
            });
        }
        res.status(200).json({
            success: true,
            data: {
                brand: updatedBrand
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
    addBrand,
    getBrands,
    deleteBrand,
    updateBrand,
}
