import React, { useEffect, useState } from 'react'
import OrderDetails from '../components/order/OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersOrders } from '../features/order/orderSlice'
import { Link } from 'react-router-dom'

function Orders() {

  const dispatch = useDispatch()
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  const { orders } = useSelector((state) => state?.orders.orderList)

  useEffect(() => {
    dispatch(getAllUsersOrders())
  }, [])
  return (
    <div className=''>
                  <h1 className='text-3xl font-medium'>Orders</h1>

      <div className='flex flex-col gap-4 my-5'>
        {
          orders && orders?.length > 0 ? orders?.map((orderItem) => {
            return (
              <div key={orderItem._id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 gap-2">
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="text-base sm:text-lg font-semibold text-gray-700 break-all">{orderItem._id}</p>
                  </div>
                  <div className="">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-md ${orderItem.orderStatus === 'confirmed'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                        }`}
                    >
                      {orderItem.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 gap-4">
                  {/* Full Name */}
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-gray-500">Name:</span>
                    <p className="capitalize text-sm sm:text-base text-gray-700 text-center sm:text-left">
                      {orderItem?.shippingInfo.fullName}
                    </p>
                  </div>

                  {/* Order Date */}
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-gray-500">Date:</span>
                    <p className="text-sm sm:text-base text-gray-700 text-center sm:text-left">
                      {orderItem?.orderDate.split("T")[0]}
                    </p>
                  </div>

                  {/* Total Amount */}
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-gray-500">Amount:</span>
                    <p className="text-sm sm:text-base text-gray-700 text-center sm:text-left">
                      ${orderItem.totalAmount.toFixed(2)}
                    </p>
                  </div>

                  {/* Details Link */}
                  <div className="text-center sm:text-right">
                    <Link
                      to={`/admin/orders/order-details/${orderItem._id}`}
                      className="text-blue-500 underline font-medium text-sm sm:text-base"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
            :
            null
        }

      </div>

      {
        isOrderDetailsOpen && <OrderDetails isOpen={isOrderDetailsOpen} setIsOrderDetailsOpen={setIsOrderDetailsOpen} />
      }

    </div>
  )
}

export default Orders
