const Brand = require('../models/brandModel')

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
module.exports = {
    getBrands,
}