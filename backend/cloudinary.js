const cloudinary = require("cloudinary")
const multer = require("multer");

cloudinary.config({
    cloud_name: 'dcgz94kgg',
    api_key: '833199382551128',
    api_secret: 'DH9nR0nUqe5twmXbjS8t-VUQ8VY'
});

const storage = new multer.memoryStorage();

const cloudinaryUploadImg = async (file) => {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    })
    return result
};

const cloudinaryDeleteImg = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        return error
    }
};

const uploadImg = multer({
    storage
});

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg, uploadImg }