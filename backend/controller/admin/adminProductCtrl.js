const Product = require('../../models/productModel')
const Brand = require('../../models/brandModel')
const slugify = require('slugify')
const { cloudinaryUploadImg, cloudinaryDeleteImg } = require('../../cloudinary')
const Category = require('../../models/categoryModal')

const addProduct = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body)
        res.status(201).json({
            success: true,
            data: {
                newProduct
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
};

const getAllProducts = async (req, res) => {
    try {
        const productList = await Product.find({}).populate('category').populate('brand')
        res.status(200).json({
            status: 'success',
            length: productList.length,
            data: {
                productList
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }

};

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const findProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product with that ID is not found!",
            });
        }
        res.status(200).json({
            success: true,
            data: {
                updatedProduct: findProduct
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id)
        const imageId = product.image.public_id
        await cloudinaryDeleteImg(imageId)

        const findProduct = await Product.findByIdAndDelete(id)

        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product with that ID is not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product delete successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" + req.file.mimetype + ";base64," + b64
        const result = await cloudinaryUploadImg(url)
        res.json({
            success: true,
            result
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};

const handleImageDelete = async (req, res) => {
    try {
        const { public_id, itemId, schemaType } = req.body; // Get public_id, itemId, and schemaType
        
        // Step 1: Delete the image from Cloudinary
        const result = await cloudinaryDeleteImg(public_id);

        if (result.result === "ok") {
            // Step 2: Select the correct model based on schemaType
            let Model;
            if (schemaType === "Product") Model = Product;
            else if (schemaType === "Brand") Model = Brand;
            else if (schemaType === "Category") Model = Category;
            else throw new Error("Invalid schema type");

            // Step 3: Remove the image field from the document in the specified schema
            // await Model.findByIdAndUpdate(itemId, { $unset: { image: "" } });
            const t = await Model.findByIdAndUpdate(itemId, { $unset: { "image.url": "", "image.public_id": "" } });

            res.json({
                success: true,
                message: "Image deleted successfully from Cloudinary and MongoDB",
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Image not found on Cloudinary",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting image",
            error: error.message,
        });
    }

};

const getFilteredProducts = async (req, res) => {
    try {
        const { category = [], brand = [], sortBy = "price" } = req.query

        let filters = {}

        if (category.length) {
            filters.category = { $in: category.split(',') }
        }
        if (brand.length) {
            filters.brand = { $in: brand.split(',') }
        }

        let sort = {};

        switch (sortBy) {
            case "price":
                sort.price = 1;

                break;
            case "-price":
                sort.price = -1;

                break;
            case "title":
                sort.title = 1;

                break;

            case "-title":
                sort.title = -1;

                break;

            default:
                sort.price = 1;
                break;
        }

        const filteredProducts = await Product.find(filters).sort(sort).populate('category').populate('brand')

        res.status(200).json({
            status: true,
            length: filteredProducts.length,
            data: {
                filteredProducts
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }

};

const categoryProducts = async (req, res) => {
    try {
        const { category } = req.params;
        const { sortBy = "price" } = req.query

        let sort = {};

        switch (sortBy) {
            case "price":
                sort.price = 1;

                break;
            case "-price":
                sort.price = -1;

                break;
            case "title":
                sort.title = 1;

                break;

            case "-title":
                sort.title = -1;

                break;

            default:
                sort.price = 1;
                break;
        }

        const categoryName = await Category.findOne({ _id: category })
        const productsCategory = await Product.find({ category }).sort(sort).populate('brand')

        res.status(200).json({
            status: true,
            length: productsCategory.length,
            data: {
                categoryName: categoryName.title,
                productsCategory
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
};

const productsByBrand = async (req, res) => {
    try {
        const { brand } = req.params;
        const { sortBy = "price" } = req.query

        let sort = {};

        switch (sortBy) {
            case "price":
                sort.price = 1;

                break;
            case "-price":
                sort.price = -1;

                break;
            case "title":
                sort.title = 1;

                break;

            case "-title":
                sort.title = -1;

                break;

            default:
                sort.price = 1;
                break;
        }

        const findBrand = await Brand.findOne({ _id: brand })
        const brandProducts = await Product.find({ brand }).sort(sort).populate('category')

        res.status(200).json({
            status: true,
            length: brandProducts.length,
            data: {
                brandName: findBrand.title,
                brandProducts
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }

};

const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('brand')
        if (!product) return res.status(404).json({
            status: false,
            message: 'Product not found!',
        })
        res.status(200).json({
            status: true,
            data: {
                productDetails: product
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }

};

module.exports = {
    handleImageUpload,
    addProduct,
    getAllProducts,
    editProduct,
    deleteProduct,
    getFilteredProducts,
    getProductDetails,
    categoryProducts,
    productsByBrand,
    handleImageDelete,
}