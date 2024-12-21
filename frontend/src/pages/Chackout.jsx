import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../features/order/orderSlice';
import { toast } from 'react-toastify'
import OrderItems from '../components/account/order/OrderItems';
import { calculateOrderTotal } from '../utils/calculateOrderTotal';
import TotalOrderAmount from '../components/cart/TotalOrderAmount';
import Address from '../components/account/address/Address';

function Chackout() {

    const { cartProducts } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)
    const { approvalURL } = useSelector((state) => state.order)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [isPaymentStart, setIsPaymemntStart] = useState(false);
    const dispatch = useDispatch()

    const { subtotalAmount, totalDiscount, totalCartAmount } = calculateOrderTotal(cartProducts.products);

    function handleInitialPayment() {
        if (cartProducts.products.length === 0) {
            toast.error('Select one shipping address to proceed')
            return
        }
        if (selectedAddress === null) {
            toast.error('Select one shipping address to proceed')
            return
        }
        const orderDate = {
            userId: user.id,
            cartId: cartProducts._id,
            totalAmount: totalCartAmount,
            paymentStatus: 'pending',
            paymentMethod: 'paypal',
            orderStatus: 'pending',
            orderUpdateDate: new Date(),
            orderDate: new Date(),
            paymentId: '',
            payerId: '',
            cartProducts: cartProducts.products.map(cartProduct => ({
                productId: cartProduct.productId,
                title: cartProduct.title,
                image: { url: cartProduct.image.url },
                quantity: cartProduct.quantity,
                price: cartProduct.salePrice > 0 ? cartProduct.salePrice : cartProduct.price,
            })),
            shippingInfo: {
                fullName: selectedAddress.fullName,
                streetName: selectedAddress.streetName,
                buildingNo: selectedAddress.buildingNo,
                city: selectedAddress.city,
                phone: selectedAddress.phone,
                landmark: selectedAddress.landmark,
            }
        }
        dispatch(createOrder(orderDate)).then((data) => {
            if (data?.payload?.success) {
                setIsPaymemntStart(true);
            } else {
                setIsPaymemntStart(false);
            }
        })
    }

    if (approvalURL) {
        window.location.href = approvalURL
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

            <div className='lg:col-span-2 bg-white'>
                <Address setSelectedAddress={setSelectedAddress} />
            </div>

            <div className='p-6'>
                <h2 className='text-xl pb-4 font-medium'>Order Summary</h2>
                <div className='grid grid-cols-1 gap-4'>
                    {
                        cartProducts.products?.map((productData) => {
                            return (
                                <OrderItems
                                    key={productData.productId}
                                    productData={productData} />
                            )
                        })
                    }
                </div>

                <div className='flex flex-col gap-6 mt-6'>

                    <TotalOrderAmount
                        subtotalAmount={subtotalAmount}
                        totalDiscount={totalDiscount}
                        totalCartAmount={totalCartAmount}
                    />

                    <button
                        onClick={handleInitialPayment}
                        className='bg-blue-600 w-full text-white py-2 text-lg font-medium rounded-md '>
                        {
                            isPaymentStart
                                ?
                                "Processing Payment..."
                                :
                                "Place Order"
                        }
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Chackout
