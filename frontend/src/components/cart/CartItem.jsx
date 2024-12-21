import React from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { LuDelete } from 'react-icons/lu'

function CartItem({ cartProduct, handleQuantity, handleCartProductDelete }) {
    return (
        <div className='border-2 p-4 mb- rounded-md bg-white'>

            <div className='flex gap-4'>
                <div className='w-36'>
                    <img src={cartProduct.image.url} alt="" className='w-full object-cover' />
                </div>
                <div className='w-full'>

                    <div className='flex flex-col sm:flex-row justify-between gap-1 sm:gap-6 '>

                        <p className="text-sm block sm:hidden">
                            {cartProduct.description.substring(0, 30)}...
                        </p>

                        {/* Full description for desktop */}
                        <p className="text-lg hidden sm:block">
                            {cartProduct.description}
                        </p>

                        <div>
                            {
                                cartProduct?.salePrice ?
                                    (
                                        <div className='flex sm:flex-col items-center gap-4 sm:gap-0'>
                                            <div className='text-sm sm:text-base text-gray-500 flex items-center gap-4'><span className='line-through'>{cartProduct.price}</span></div>
                                            <div className='flex items-center gap-4'>
                                                <span className='text-lg sm:text-xl font-semibold'>${cartProduct.salePrice}</span>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className='flex items-center gap-4'>
                                            <span className='text-xl font-semibold'>${cartProduct.price}</span>
                                        </div>
                                    )
                            }

                        </div>
                    </div>
                    <div className='my-2 flex items-center gap-2'>
                        <button disabled={cartProduct.quantity === 1} onClick={() => handleQuantity(cartProduct, 'minus')} className='w-6 h-6 border border-gray-400 rounded-md'>
                            <FiMinus className='m-auto' />
                        </button>
                        <span className=''>{cartProduct.quantity}</span>
                        <button onClick={() => handleQuantity(cartProduct, 'plus')} className='w-6 h-6 border border-gray-400 rounded-md'>
                            <FiPlus className='m-auto' />
                        </button>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <button onClick={() => handleCartProductDelete(cartProduct)}>
                            <div className='flex items-center gap-1'>
                                <LuDelete />
                                <span>Delete</span>
                            </div>
                        </button>
                        <button>
                            <div className='flex items-center gap-1'>
                                <FaRegHeart />
                                <span>Wishlist</span>
                            </div>
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CartItem
