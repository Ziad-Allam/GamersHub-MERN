import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth-admin/authSlice";
import productSlice from "../features/product/productSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import brandsReducer from "../features/brand/brandSlice";
import ordersReducer from "../features/order/orderSlice";
import bannarReducer from "../features/bannar/bannarSlice";
import usersReducer from "../features/user/userSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productSlice,
        categories: categoriesReducer,
        brands: brandsReducer,
        orders: ordersReducer,
        bannar: bannarReducer,
        users: usersReducer,
    },
});

export default store;