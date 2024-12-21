import React from 'react'
import { useAddToCart } from '../../hooks/useAddToCart';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist, wishlistToggle } from '../../features/wishlist/wishlistSlice';

function ProductDetailsActionBtns({ productDetails }) {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
  
    const { handleAddToCart } = useAddToCart();

      function handleWishlist(productId) {
        dispatch(wishlistToggle({
          userId: user.id,
          productId,
        })).then(() => {
          // Re-fetch the wishlist after toggling
          dispatch(getWishlist(user.id));
        });
      }
    
    return (
        <div className='flex items-center gap-2'>
            {productDetails?.totalStock === 0 ?
                <button className='rounded-md bg-gray-500 h-12 text-lg text-white w-full opacity-60 cursor-not-allowed'>Out of Stock</button>
                :
                <button onClick={() => handleAddToCart(productDetails?._id, productDetails.totalStock)} className='rounded-md bg-orange-400 hover:bg-orange-500 h-12 text-lg font-medium text-black flex-1 flex items-center justify-center gap-2'>
                    <MdOutlineShoppingCart size={20} />
                    Add to Cart
                </button>
            }
            <button onClick={() => { handleWishlist(productDetails?._id) }} className='border rounded-md border-gray-400 h-12 w-12 text-xl flex items-center justify-center'>
                <FaRegHeart />
            </button>
        </div>
    )
}

export default ProductDetailsActionBtns