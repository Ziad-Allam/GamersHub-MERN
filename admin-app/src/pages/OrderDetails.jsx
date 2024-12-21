import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { BsCalendarDate } from "react-icons/bs";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { HiArrowSmLeft } from "react-icons/hi";
import { MdAttachMoney } from "react-icons/md";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { BsCashCoin } from "react-icons/bs";
import { getOrderDetails } from '../features/order/orderSlice';

function OrderDetails() {
    const dispatch = useDispatch()
    const { orderId } = useParams()

    const order = useSelector((state) => state?.orders?.orderDetails?.order)

    const date = new Date(order?.orderDate)

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [])

    return (
        <div className='px-4 py-8'>


            <div className='flex flex-col gap-2'>
                <Link to='/admin/orders'>
                    <div className=' flex items-center gap-1'>
                        <HiArrowSmLeft />
                        <span className='text-xs'>Back to orders</span>
                    </div>
                </Link>
                <h2 className='text-2xl font-medium mb-4'>Order Details</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-[1fr_400px] gap-4'>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden border rounded-md">
                                <table className="min-w-full text-left text-sm ">
                                    <thead
                                        className="border-b bg-white font-medium">
                                        <tr>
                                            <th scope="col" className="px-6 py-4"></th>
                                            <th scope="col" className="px-6 py-4">Title</th>
                                            <th scope="col" className="px-6 py-4">Product ID</th>
                                            <th scope="col" className="px-6 py-4">QTY</th>
                                            <th scope="col" className="px-6 py-4">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order?.cartProducts.map((product) => {
                                                return (
                                                    <tr className="border-b">
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                            <div className='flex items-center justify-center'>
                                                                <div className='w-14 h-14'>
                                                                    <img src={product?.image.url} alt="" className='w-full object-cover' />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">{product?.title}</td>
                                                        <td className="whitespace-nowrap px-6 py-4 uppercase">{product._id}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{product.quantity}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">${product.price?.toFixed(2)}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='flex flex-col gap-4 order-first sm:order-last'>
                    <div className='border px-4 py-2 rounded-md font-light'>Order ID: <span className='font-medium uppercase'>{order?._id}</span></div>
                    <div className='border px-4 py-2 rounded-md'>
                        <div className='flex flex-col gap-1 pb-3 mb-3 border-b'>
                            <div className='flex items-center gap-3'>
                                <BsCalendarDate />
                                <div className='font-light'>Placed on: <span className='text-sm font-semibold'>{`${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`}</span></div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <BsCashCoin />
                                <div className='font-light'>Payment Status: <span className='text-sm font-semibold'>{order?.paymentStatus}</span></div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <HiOutlineCreditCard />
                                <div className='font-light'>Payment Method: <span className='text-sm font-semibold'>{order?.paymentMethod}</span></div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className='text-green-600'>
                                    <BsClipboard2CheckFill />
                                </div>
                                <span className='font-medium capitalize text-green-500'>{order?.orderStatus}</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <MdAttachMoney />
                            <div className='font-light'>Total Price: <span className='text-sm font-semibold'>{order?.totalAmount.toFixed(2)}</span></div>
                        </div>
                    </div>
                    <div className='border p-4 rounded-md'>
                        <h3 className='mb-2 font-semibold'>Shipping Info:</h3>
                        <div className='flex flex-col'>
                            <label className='font-light'>Full Name: <span className='capitalize font-medium'>{order?.shippingInfo.fullName}</span></label>
                            <label className='font-light'>Street Name: <span className='capitalize font-medium'>{order?.shippingInfo.streetName}</span></label>
                            <label className='font-light'>Building No/Name: <span className='capitalize font-medium'>{order?.shippingInfo.buildingNo}</span></label>
                            <label className='font-light'>City: <span className='capitalize font-medium'>{order?.shippingInfo.city}</span></label>
                            <label className='font-light'>Phone: <span className='capitalize font-medium'>{order?.shippingInfo.phone}</span></label>
                            <label className='font-light'>Landmark: <span className='capitalize font-medium'>{order?.shippingInfo.landmark}</span></label>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default OrderDetails
