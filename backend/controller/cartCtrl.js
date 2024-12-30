const Cart = require('../models/cartModel')
const Product = require('../models/productModel')

const addToCart = async (req, res) => {
    try {

        const { userId, productId, quantity } = req.body

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data'
            })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            })
        }

        let cart = await Cart.findOne({ userId })

        if (!cart) {
            cart = new Cart({ userId, products: [] })
        }

        const findProductIndex = cart.products.findIndex(product => product.productId.toString() === productId)

        if (findProductIndex === -1) {
            cart.products.push({ productId, quantity })
        } else {
            cart.products[findProductIndex].quantity += quantity
        }

        await cart.save()

        res.status(200).json({
            success: true,
            data: {
                cart
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getCartitems = async (req, res) => {
    try {

        const { userId } = req.params

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User id is manadatory!'
            })
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: "products.productId",
            select: "image title price salePrice totalStock description",
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found!'
            })
        }

        const validItems = cart.products.filter(product => product.productId)

        if (validItems.length < cart.products.length) {
            cart.products = validItems
            await cart.save()
        }

        const populateCartProducts = validItems.map((product) => ({
            productId: product.productId._id,
            image: product.productId.image,
            title: product.productId.title,
            price: product.productId.price,
            salePrice: product.productId.salePrice,
            totalStock: product.productId.totalStock,
            description: product.productId.description,
            quantity: product.quantity,
        }));        

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                products: populateCartProducts
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateCartItemQuantity = async (req, res) => {
    try {

        const { userId, productId, quantity } = req.body

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data'
            })
        }

        const cart = await Cart.findOne({ userId })

        if (!cart) {
            res.status(404).json({
                success: false,
                message: 'Cart not found!'
            })
        }

        const findProductIndex = cart.products.findIndex(
            (product) => product.productId.toString() === productId
        );

        if (findProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Cart item not present !",
            });
        }

        cart.products[findProductIndex].quantity = quantity;
        await cart.save();

        await cart.populate({
            path: "products.productId",
            select: "image title price salePrice totalStock description",
        });

        const populateCartProducts = cart.products.map((product) => ({
            productId: product.productId ? product.productId._id : null,
            image: product.productId ? product.productId.image : null,
            title: product.productId ? product.productId.title : "Product not found",
            price: product.productId ? product.productId.price : null,
            salePrice: product.productId ? product.productId.salePrice : null,
            totalStock: product.productId ? product.productId.totalStock : null,
            description: product.productId ?product.productId.description: null,
            quantity: product.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                products: populateCartProducts
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteCartitem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: "products.productId",
            select: "image title price salePrice",
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!",
            });
        }

        cart.products = cart.products.filter(
            (item) => item.productId._id.toString() !== productId
        );

        await cart.save();

        await cart.populate({
            path: "products.productId",
            select: "image title price salePrice description",
        });

        const populateCartProducts = cart.products.map((product) => ({
            productId: product.productId ? product.productId._id : null,
            image: product.productId ? product.productId.image : null,
            title: product.productId ? product.productId.title : "Product not found",
            price: product.productId ? product.productId.price : null,
            salePrice: product.productId ? product.productId.salePrice : null,
            description: product.productId ?product.productId.description: null,
            quantity: product.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                products: populateCartProducts,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    addToCart,
    getCartitems,
    updateCartItemQuantity,
    deleteCartitem,
}