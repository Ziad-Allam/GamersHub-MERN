import React from 'react';
import { Outlet } from "react-router-dom";
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';

function AuthLayout() {
    return (
        <>
            <AuthHeader />
            <div className='flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-200'>
                <Outlet />
            </div>
            <AuthFooter />
        </>
    )
}

export default AuthLayout
