import React, { useState } from 'react'
import Header from './header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer'
import MobileBottomActions from '../mobile/MobileBottomActions'

function Layout() {
    return (
        <div className='flex flex-col bg-gray-100 overflow-hidden'>
            <Header />
            <main className='flex flex-col w-full 2xl:container mx-auto bg-white px-4'>
                <Outlet />
            </main>
            <MobileBottomActions />
            <Footer />
        </div>
    )
}

export default Layout
