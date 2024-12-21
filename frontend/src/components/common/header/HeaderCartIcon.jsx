import React, { useEffect } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchCartProducts } from '../../../features/cart/cartSlice';

function HeaderCartIcon() {

    const dispatch = useDispatch()

    const { products } = useSelector((state) => state.cart.cartProducts)
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if(user)
        dispatch(fetchCartProducts(user?.id))
    }, [])

    return (
        <Link to='cart'>
            <div className='relative'>
                <MdOutlineShoppingCart />
                {products?.length > 0 &&
                    <div className='w-5 h-5 absolute -top-2 -right-3 bg-orange-500 rounded-full flex items-center justify-center text-sm text-black font-medium'>
                        {products?.length}
                    </div>
                }
            </div>
        </Link>
    )
}

export default HeaderCartIcon
