import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import brandsReducer from "../features/brands/brandsSlice";
import productsSlice from "../features/products/productsSlice";
import cartSlice from "../features/cart/cartSlice";
import addressSlice from "../features/address/addressSlice";
import orderSlice from "../features/order/orderSlice";
import reviewsSlice from "../features/reviews/reviewsSlice";
import bannarReducer from "../features/banner/bannerSlice";
import sortReducer  from "../features/sort/sortSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoriesReducer,
        brands: brandsReducer,
        products: productsSlice,
        cart: cartSlice,
        address: addressSlice,
        order: orderSlice,
        reviews: reviewsSlice,
        banner: bannarReducer,
        wishlist: wishlistReducer,
        sort: sortReducer,
    },
});

export default store;