import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWishlist } from '../features/wishlist/wishlistSlice'
import ProductCard from '../components/products/ProductCard'

function Wishlist() {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { wishlist } = useSelector((state) => state.wishlist)

    useEffect(() => {
        dispatch(getWishlist(user?.id))
    }, [])

    return (
        <div className='py-6'>

            {
                wishlist?.products?.length > 0 && <h1 className='text-lg sm:text-2xl font-semibold pb-4'>Wishlist</h1>
            }
            
            {
                wishlist?.products?.length > 0 ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {wishlist?.products?.map(wishlist =>
                            <ProductCard key={wishlist?._id} product={wishlist} />
                        )}
                    </div>
                    :
                    <div className=' mx-auto w-full lg:w-[800px]  flex items-center justify-center'>
                        <img src="https://doukani.com/img/emptywishlist.jpg" alt="" className='' />
                    </div>
            }
        </div>
    )
}
// https://static.oxinis.com/healthmug/image/healthmug/empty-wishlist.webp
export default Wishlist
