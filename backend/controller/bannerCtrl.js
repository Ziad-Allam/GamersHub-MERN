const Banner = require('../models/bannerModal')

const getBanneres = async (req, res) => {
    try {
        const images = await Banner.find()
        console.log('Banners fetched successfully:', images);

        res.status(200).json({
            success: true,
            data: {
                images
            }
        })

    } catch (e) {
        console.error('Error fetching banners:', e.message);

        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

module.exports = { getBanneres }