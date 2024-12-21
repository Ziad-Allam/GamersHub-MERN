import React, { useEffect, useRef } from 'react'
import ProfileDropdown from './ProfileDropdown';
import HeaderCartIcon from './HeaderCartIcon';
import HeaderWishlistIcon from './HeaderWishlistIcon';

function HeaderUserActions() {
    return (
        <div className='hidden lg:block'>
            <div className='flex items-center gap-8 text-2xl text-white'>
                <ProfileDropdown />
                <HeaderCartIcon />
                <HeaderWishlistIcon />
            </div>
        </div>
    )
}

export default HeaderUserActions