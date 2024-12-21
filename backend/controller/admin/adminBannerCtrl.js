const { cloudinaryDeleteImg } = require('../../cloudinary')
const Banner = require('../../models/bannerModal')

const addBanner = async (req, res) => {
    try {

        const { image } = req.body
        const bannarImage = new Banner({
            image
        })
        await bannarImage.save()

        res.status(201).json({
            success: true,
            data: {
                bannarImage
            }
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

const getBanneres = async (req, res) => {
    try {
        const images = await Banner.find({})

        res.status(200).json({
            success: true,
            data: {
                images
            }
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}

const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;

        const banner = await Banner.findById(id)
        const imageId = banner.image.public_id
        await cloudinaryDeleteImg(imageId)

        const findBanner = await Banner.findByIdAndDelete(id)

        if (!findBanner) {
            return res.status(404).json({
                success: false,
                message: "Banner with that ID is not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Banner delete successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};

module.exports = { addBanner, getBanneres, deleteBanner }