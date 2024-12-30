const Product = require('../models/productModel')
const Brand = require('../models/brandModel')
const Category = require('../models/categoryModal')

const getProducts = async (req, res) => {
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
            message: error.message,
        });
    }

}

const getProductsByCategory = async (req, res) => {
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
            message: error.message,
        });
    }
}

const getProductsByBrand = async (req, res) => {
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
            message: error.message,
        });
    }

}

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
            message: error.message,
        });
    }

}

module.exports = {
    getProducts,
    getProductsByCategory,
    getProductsByBrand,
    getProductDetails
}