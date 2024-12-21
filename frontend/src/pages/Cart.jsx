import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartProduct, fetchCartProducts, updateCartQuantity } from '../features/cart/cartSlice'
import { toast } from 'react-toastify';
import CartItem from '../components/cart/CartItem';
import { Link } from 'react-router-dom';
import { calculateOrderTotal } from '../utils/calculateOrderTotal';
import TotalOrderAmount from '../components/cart/TotalOrderAmount';

function Cart() {

    const dispatch = useDispatch()

    const { products } = useSelector((state) => state.cart.cartProducts)
    const { user } = useSelector((state) => state.auth)

    const { subtotalAmount, totalDiscount, totalCartAmount } = calculateOrderTotal(products);

    function handleCartProductDelete(cartProduct) {
        dispatch(deleteCartProduct({ userId: user.id, productId: cartProduct.productId }))
    }

    function handleQuantity(cartProduct, actionType) {
        if (actionType === 'plus') {
            let getCartProducts = products || []
            if (getCartProducts.length) {
                const indexOfCurrentCartProduct = getCartProducts.findIndex(product => product.productId === cartProduct.productId)
                if (indexOfCurrentCartProduct > -1) {
                    const getQuantity = getCartProducts[indexOfCurrentCartProduct].quantity
                    if (getQuantity + 1 > cartProduct.totalStock) {
                        toast.error(`Only ${getQuantity} quantity can be added for this product`)
                        return
                    }
                }
            }
        }
        dispatch(updateCartQuantity({
            userId: user.id,
            productId: cartProduct.productId,
            quantity:
                actionType === 'minus' ?
                    cartProduct.quantity - 1
                    :
                    cartProduct.quantity + 1
        })).then(data => {
            if (data.payload.success) {
                toast.success('Success: You have modified your shopping cart!')
            }
        })
    }

    useEffect(() => {
        dispatch(fetchCartProducts(user.id))
    }, [dispatch])

    // Render Empty Cart
    if (!products?.length) {
        return (
            <div className="flex flex-col items-center gap-6 py-10">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-medium">Your shopping cart is empty</h1>
                <Link to='/shop'>
                    <button className="bg-gray-800 py-2 px-6 text-white rounded-md font-medium">
                        Start Shopping
                    </button>
                </Link>
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png?f=webp" alt="" />
            </div>
        );
    }

    // Render Cart with Products
    return (
        <div className='py-6'>
            <h2 className="text-lg sm:text-2xl font-semibold pb-4">
                Shopping Cart <span className="text-sm sm:text-base font-normal">({products.length} items)</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* cart items */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 gap-4">
                        {products.map((cartProduct) => (
                            <CartItem
                                key={cartProduct.productId}
                                cartProduct={cartProduct}
                                handleQuantity={handleQuantity}
                                handleCartProductDelete={handleCartProductDelete}
                            />
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-blue-50 p-4 rounded shadow">
                    <h2 className="text-2xl pb-4 font-medium">Order Summary</h2>
                    <TotalOrderAmount
                        subtotalAmount={subtotalAmount}
                        totalDiscount={totalDiscount}
                        totalCartAmount={totalCartAmount}
                    />
                    <Link to='checkout'>
                        <button className='bg-blue-600 w-full text-white py-2 font-bold rounded-md mt-6'>Checkout</button>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Cart
