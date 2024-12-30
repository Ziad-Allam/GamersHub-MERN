const Banner = require('../models/bannerModal')

const getBanneres = async (req, res) => {
    try {
        const images = await Banner.find()

        res.status(200).json({
            success: true,
            data: {
                images
            }
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

module.exports = { getBanneres }