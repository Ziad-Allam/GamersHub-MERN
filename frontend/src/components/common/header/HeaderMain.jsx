import React, { useState } from 'react'
import Logo from './Logo';
import HeaderUserActions from './HeaderUserActions';

function HeaderMain() {

    const [openAccountDropdown, setOpenAccountDropdown] = useState(false)

  return (
    <div className='bg-blue-600'>
    <div className='h-16 flex items-center justify-between px-4 md:px-6 xl:px-36'>
        <Logo />
        <HeaderUserActions openAccountDropdown={openAccountDropdown} setOpenAccountDropdown={setOpenAccountDropdown} />
    </div>
</div>
)
}

export default HeaderMain
