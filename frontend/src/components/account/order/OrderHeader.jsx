import React from 'react'

function OrderHeader({orderData,date}) {
    return (
        <>
            <div className='border-b-2 mb-4 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                <div className=''>
                    <span className='capitalize text-green-500 font-semibold text-sm'>{orderData.orderStatus}</span>
                    <div className='font-light'>Placed on: <span className='text-sm font-semibold'>{`${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`}</span></div>
                </div>
                <div className='text-base font-light'>Order ID: <span className='text-sm font-semibold uppercase'>{orderData._id}</span></div>
            </div>
        </>
    )
}

export default OrderHeader
