import React from 'react'
import OrderHeader from './OrderHeader'
import { Link } from 'react-router-dom'
import OrderItems from './OrderItems'

function OrderCard({ orderData }) {

    const date = new Date(orderData.orderDate)

    return (
        <div>
            <Link to={`/order/order-details/${orderData._id}`}>

                <div className='border p-4 rounded-md'>

                    <OrderHeader orderData={orderData} date={date} />

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        {orderData.cartProducts.map((product) => {
                            return (
                                <div key={product._id} className='flex items-center gap-4'>
                                    <div className="w-20 h-20 flex-shrink-0">
                                        <img src={product.image.url} className='w-full object-cover' alt="" />
                                    </div>
                                    <p className="flex-grow text-sm sm:text-base overflow-hidden text-ellipsis break-words">
                                        {product.title}
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                </div>

            </Link>
        </div>
    )
}

export default OrderCard
