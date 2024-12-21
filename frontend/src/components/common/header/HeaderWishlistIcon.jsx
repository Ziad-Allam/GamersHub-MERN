import React, { useEffect } from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getWishlist } from '../../../features/wishlist/wishlistSlice'

function HeaderWishlistIcon() {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { wishlist } = useSelector((state) => state.wishlist)

    useEffect(() => {
        if(user)
        dispatch(getWishlist(user?.id))
    }, [])

    return (
        <Link to='wishlist'>
            <div className='relative'>
                <FaRegHeart />
                {wishlist?.products?.length > 0 &&
                    <div className='w-5 h-5 absolute -top-2 -right-3 bg-orange-500 rounded-full flex items-center justify-center text-sm text-black font-medium'>
                        {wishlist?.products?.length}
                    </div>
                }
            </div>
        </Link>
    )
}

export default HeaderWishlistIcon
