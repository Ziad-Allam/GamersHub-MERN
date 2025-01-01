import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineShoppingCart } from "react-icons/md";
import { useAddToCart } from '../../hooks/useAddToCart';
import { getWishlist, wishlistToggle } from '../../features/wishlist/wishlistSlice';

function ProductCard({ product }) {

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
    <div className='w-full border border-gray-300 p-2 rounded-md relative'>
      <button onClick={() => { handleWishlist(product?._id) }} className='bg-white hover:text-red-600 p-2 rounded-lg absolute top-5 right-5 text-lg'>
        <FaRegHeart />
      </button>

      <Link to={`/product-details/${product?._id}`} >
        <div >
          <img src={product?.image?.url} alt={product.title} className='w-full object-cover' />
        </div>

        <div className='p-2 flex flex-grow flex-col gap-2'>
          <div className='leading-5 h-10 overflow-hidden'>
            <p>{product?.description.substring(0, 62)} ...</p>
          </div>

          <div className="flex items-center justify-between">
            {product?.salePrice > 0 ? (
              <>
                <p className="text-lg font-medium text-muted-foreground">
                  ${product?.salePrice}
                </p>
                <p className='line-through text-sm text-gray-500'>
                  ${product?.price}
                </p>
              </>
            ) :
              <p className='font-bold text-lg'>
                ${product?.price}
              </p>
            }
          </div>

        </div>
      </Link>
      <button onClick={() => handleAddToCart(product?._id, product.totalStock)} className='bg-amber-300 hover:bg-amber-400 w-full py-2 rounded-md font-medium flex items-center justify-center gap-2 text-sm'>
        <MdOutlineShoppingCart size={17} />
        <p>Add to cart</p>
      </button>

    </div>

  )
}

export default ProductCard
