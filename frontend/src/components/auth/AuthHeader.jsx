import React from 'react'
import Logo from '../common/header/Logo'

function AuthHeader() {
    return (
        <div className='bg-blue-600'>
            <div className='h-16 flex items-center justify-between px-4 md:px-6 xl:px-36'>
                <Logo />
            </div>
        </div>
    )
}

export default AuthHeader
