const Wishlist = require('../models/wishlistModel')

const addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Find the user's wishlist
        let wishlist = await Wishlist.findOne({ userId });

        // If the wishlist doesn't exist, create a new one
        if (!wishlist) {
            wishlist = new Wishlist({ userId, products: [{ productId }] });
            await wishlist.save();
            return res.status(201).json({ success: true, message: "Product added to wishlist." });
        }

        // Check if the product is already in the wishlist
        const productIndex = wishlist.products.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (productIndex > -1) {
            // Remove the product if it's already in the wishlist
            wishlist.products.splice(productIndex, 1);
            await wishlist.save();
            return res.status(200).json({ success: true, message: "Product removed from wishlist." });
        } else {
            // Add the product if it's not in the wishlist
            wishlist.products.push({ productId });
            await wishlist.save();
            return res.status(200).json({ success: true, message: "Product added to wishlist." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred.", error });
    }
};

const getWishlist = async (req, res) => {
    try {

        const { userId } = req.params

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User id is manadatory!'
            })
        }

        const wishlist = await Wishlist.findOne({ userId }).populate({
            path: "products.productId",
            select: "image title price salePrice totalStock description",
        });

        // const wishlist = await Wishlist.findOne({ userId }).populate('products.productId');


        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: 'wishlist not found!'
            })
        }

        const validItems = wishlist.products.filter(product => product.productId)

        if (validItems.length < wishlist.products.length) {
            wishlist.products = validItems
            await wishlist.save()
        }

        const populateWishlistProducts = validItems.map((product) => ({
            _id: product.productId._id,
            image: product.productId.image,
            title: product.productId.title,
            price: product.productId.price,
            salePrice: product.productId.salePrice,
            totalStock: product.productId.totalStock,
            description: product.productId.description,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...wishlist._doc,
                products: populateWishlistProducts
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

module.exports = {
    addToWishlist,
    getWishlist
}