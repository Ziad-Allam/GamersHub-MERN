import React, { useEffect } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCartProducts } from '../../features/cart/cartSlice'

function MobileCartIcon() {

  const dispatch = useDispatch()

  const { products } = useSelector((state) => state.cart.cartProducts)
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if(user)
    dispatch(fetchCartProducts(user?.id))
  }, [])

  return (
    <Link to="cart">
      <div className='relative'>
        <MdOutlineShoppingCart size={24} />
        {products?.length > 0 &&
          <div className='w-4 h-4 absolute -top-2 -right-1 bg-orange-500 rounded-full flex items-center justify-center text-xs text-black font-medium'>
            {products?.length}
          </div>
        }
      </div>
    </Link>
  )
}

export default MobileCartIcon
