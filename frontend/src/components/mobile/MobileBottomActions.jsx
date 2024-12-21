import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MobileSideNav from './MobileSideNav';
import NavIconMobile from './MobileNavIcon';
import WishlistIconMobile from './MobileWishlistIcon';
import HomeIconMobile from './MobileHomeIcon';
import CartIconMobile from './MobileCartIcon';
import UserIconMobile from './MobileUserIcon';
import MobileUserSidebar from './MobileUserSidebar';

function MobileBottomActions() {

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [openNavItems, setOpenNavItems] = useState(false)
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false)

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-200 z-50 lg:hidden py-2">

      <div className="flex justify-around items-center py-2">
        <NavIconMobile setOpenNavItems={setOpenNavItems} />
        <WishlistIconMobile />
        <HomeIconMobile />
        <CartIconMobile />
        <UserIconMobile isAuthenticated={isAuthenticated} user={user} setIsUserSidebarOpen={setIsUserSidebarOpen} />
      </div>

      <div className='lg:hidden'>
        <MobileSideNav openNavItems={openNavItems} setOpenNavItems={setOpenNavItems} />
        <MobileUserSidebar isUserSidebarOpen={isUserSidebarOpen} setIsUserSidebarOpen={setIsUserSidebarOpen} />
      </div>

    </div>
  );
}

export default MobileBottomActions;
