import React from 'react'

function OrderItems({ productData }) {
  return (
    <div className='flex gap-4'>
      <div className="w-20 h-20 flex-shrink-0">
        <img src={productData?.image.url} alt="" className='w-full object-cover' />
      </div>
      <div>
        <p className="flex-grow text-sm sm:text-base overflow-hidden text-ellipsis break-words">
          {productData.title}
        </p>
        <div>Price: {productData.price}</div>
        <div>Qty: {productData.quantity}</div>
        <div className='font-medium'>Total: {productData.quantity * productData.price}</div>
      </div>
    </div>
  )
}

export default OrderItems
