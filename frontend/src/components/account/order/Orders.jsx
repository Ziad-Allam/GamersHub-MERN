import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUser } from '../../../features/order/orderSlice'
import OrderCard from './OrderCard'

function Orders() {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { orderList } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.id))
  }, [])

  return (
    <>
      {
        orderList?.orders && orderList.orders.length > 0
        &&
        <div className="py-6">
          <h1 className="text-3xl font-medium mb-1">Your Orders</h1>
          <p className="text-gray-600">View the order status and your order history</p>
        </div>
      }

      <div className='grid gap-6'>
        {
          orderList?.orders && orderList.orders.length > 0 ?
            orderList?.orders.map((orderData) => {
              return (
                <OrderCard key={orderData?._id} orderData={orderData} />
              )
            })
            :
            <div>
              <h2 className='text-center text-xl font-medium'>It looks like you haven't placed any order before.</h2>
            </div>
        }
      </div>
    </>
  )
}

export default Orders
