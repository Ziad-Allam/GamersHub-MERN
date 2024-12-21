import React, { useEffect } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getWishlist } from '../../features/wishlist/wishlistSlice'

function MobileWishlistIcon() {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { wishlist } = useSelector((state) => state.wishlist)

  useEffect(() => {
    if(user)
      dispatch(getWishlist(user?.id))
  }, [])

  return (
    <Link to="/wishlist">
      <div className='relative'>
        <FaRegHeart size={24} />
        {wishlist?.products?.length > 0 &&
          <div className='w-4 h-4 absolute -top-2 -right-1 bg-orange-500 rounded-full flex items-center justify-center text-xs text-black font-medium'>
            {wishlist?.products?.length}
          </div>
        }
      </div>
    </Link>
  )
}

export default MobileWishlistIcon
