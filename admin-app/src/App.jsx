import React from 'react';
import './App.css';
import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom"
import Login from './pages/Login'
import CheckAuth from './components/common/CheckAuth'
import AuthLayout from './components/auth/Layout'
import Layout from './components/common/Layout'
import Dashboard from './pages/Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './features/auth-admin/authSlice'
import Products from './pages/Products'
import Brands from './pages/Brands'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import OrderDetails from './pages/OrderDetails'
import Users from './pages/Users'
import Admins from './pages/Admins'
import Notfound from './pages/Notfound'

function App() {

  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='bg-white'>
      <Routes>

        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login-admin" element={<Login />} />
        </Route>

        <Route path="/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Layout />
          </CheckAuth>}>
          <Route index element={<Dashboard />} />
          <Route path='products' element={<Products />} />
          <Route path='categories' element={<Categories />} />
          <Route path='brands' element={<Brands />} />
          <Route path='orders' element={<Orders />} />
          <Route path='users' element={<Users />} />
          <Route path='admins' element={<Admins />} />
          <Route path='orders/order-details/:orderId' element={<OrderDetails />} />
        </Route>

        <Route path="*" element={<Notfound />} />

      </Routes>
    </div>
  )
}

export default App
