import React from 'react'
import { BsCalendarDate, BsCashCoin, BsClipboard2CheckFill } from 'react-icons/bs'
import { HiOutlineCreditCard } from 'react-icons/hi'
import { MdAttachMoney } from 'react-icons/md'

function OrderPaymentInfoCard({ orderDetails }) {

    const date = new Date(orderDetails?.order.orderDate)

    return (
        <div className='border px-4 py-2 rounded-md'>
            <div className='flex flex-col gap-1 pb-3 mb-3 border-b'>
                <div className='flex items-center gap-3'>
                    <BsCalendarDate />
                    <div className='font-light'>Placed on: <span className='text-sm font-semibold'>{`${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`}</span></div>
                </div>
                <div className='flex items-center gap-3'>
                    <BsCashCoin />
                    <div className='font-light'>Payment Status: <span className='text-sm font-semibold'>{orderDetails?.order.paymentStatus}</span></div>
                </div>
                <div className='flex items-center gap-3'>
                    <HiOutlineCreditCard />
                    <div className='font-light'>Payment Method: <span className='text-sm font-semibold'>{orderDetails?.order.paymentMethod}</span></div>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='text-green-600'>
                        <BsClipboard2CheckFill />
                    </div>
                    <span className='font-medium capitalize text-green-500'>{orderDetails?.order.orderStatus}</span>
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <MdAttachMoney />
                <div className='font-light'>Total Price: <span className='text-sm font-semibold'>{orderDetails?.order.totalAmount.toFixed(2)}</span></div>
            </div>
        </div>
    )
}

export default OrderPaymentInfoCard
