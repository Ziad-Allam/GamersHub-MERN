import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../features/order/orderSlice'
import { Link, useParams } from 'react-router-dom'
import { HiArrowSmLeft } from "react-icons/hi";
import OrderItems from '../components/account/order/OrderItems';
import OrderShippingInfoCard from '../components/account/order/OrderShippingInfoCard';
import OrderPaymentInfoCard from '../components/account/order/OrderPaymentInfoCard';

function OrderDetails() {

    const dispatch = useDispatch()
    const { id } = useParams()
    const orderDetails = useSelector((state) => state?.order?.orderDetails)

    useEffect(() => {
        dispatch(getOrderDetails(id))
    }, [])

    return (
        <>
            <div className='flex flex-col gap-2 py-6'>
                <Link to='/my-profile'>
                    <div className=' flex items-center gap-1'>
                        <HiArrowSmLeft />
                        <span className='text-xs'>Back to orders</span>
                    </div>
                </Link>
                <h2 className='text-2xl font-medium'>Order Details</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-[1fr_400px] gap-4'>

                <div className='border p-4 rounded-md'>
                    <div className='grid grid-cols-1 gap-8'>
                        {orderDetails?.order.cartProducts.map((productData) => {
                            return (
                                <OrderItems key={productData._id} productData={productData} />
                            )
                        })}
                    </div>
                </div>

                <div className='flex flex-col gap-4 order-first sm:order-last'>
                    <div className='border px-4 py-2 rounded-md font-light'>
                        Order ID: <span className='font-medium uppercase'>{orderDetails?.order._id}</span>
                    </div>
                    <OrderPaymentInfoCard orderDetails={orderDetails} />
                    <OrderShippingInfoCard orderDetails={orderDetails} />
                </div>

            </div>
        </>
    )
}

export default OrderDetails
