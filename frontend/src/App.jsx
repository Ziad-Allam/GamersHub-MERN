import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/Layout"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Layout from "./components/common/Layout"
import Home from "./pages/Home"
import Wishlist from "./pages/Wishlist"
import Cart from "./pages/Cart"
import ProductDetails from "./pages/products/ProductDetails"
import CheckAuth from "./components/common/CheckAuth"
import Notfound from "./pages/NotFound"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./features/auth/authSlice"
import ProductsListByCategory from "./pages/products/ProductsListByCategory"
import Checkout from "./pages/Chackout"
import MyProfile from "./pages/my profile/MyProfile"
import PaypalReturn from "./pages/payments/PaypalReturn"
import PaymentSuccess from "./pages/payments/PaymentSuccess"
import OrderDetails from "./pages/OrderDetails"
import ProductsListByBrand from "./pages/products/ProductsListByBrand"
import ProductsList from "./pages/products/ProductsList"
import ScrollToTop from "./utils/scrollToTop"

function App() {

  const { isAuthenticated, user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <div className='bg-white'>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="wishlist" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Wishlist />
            </CheckAuth>}
          />
          <Route path="cart" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Cart />
            </CheckAuth>
          } />
          <Route path="my-profile" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <MyProfile />
            </CheckAuth>
          } />
          <Route path="product-details/:id" element={<ProductDetails />} />
          <Route path="shop" element={<ProductsList />} />
          <Route path="/shop/categories/:categoryName/:id" element={<ProductsListByCategory />} />
          <Route path="/shop/brands/:brandName/:id" element={<ProductsListByBrand />} />
          <Route path="cart/checkout" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Checkout />
            </CheckAuth>
          } />
          <Route path="paypal-return" element={<PaypalReturn />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="order/order-details/:id" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <OrderDetails />
            </CheckAuth>
          } />
        </Route>

        <Route path="*" element={<Notfound />} />

      </Routes>
    </div>
  )
}

export default App
