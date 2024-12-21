import React from 'react'

function OrderShippingInfoCard({orderDetails}) {
    return (
        <div className='border p-4 rounded-md'>
            <h3 className='mb-2 font-semibold'>Shipping Info:</h3>
            <div className='flex flex-col'>
                <label className='font-light'>Full Name: <span className='capitalize font-medium'>{orderDetails?.order.shippingInfo.fullName}</span></label>
                <label className='font-light'>Street Name: <span className='capitalize font-medium'>{orderDetails?.order.shippingInfo.streetName}</span></label>
                <label className='font-light'>Building No/Name: <span className='capitalize font-medium'>{orderDetails?.order.shippingInfo.buildingNo}</span></label>
                <label className='font-light'>City: <span className='capitalize font-medium'>{orderDetails?.order.shippingInfo.city}</span></label>
                <label className='font-light'>Phone: <span className='capitalize font-medium'>{orderDetails?.order.shippingInfo.phone}</span></label>
                <label className='font-light'>Landmark: <span className='capitalize font-medium'>{orderDetails?.order.shippingInfo.landmark}</span></label>
            </div>
        </div>
    )
}

export default OrderShippingInfoCard
