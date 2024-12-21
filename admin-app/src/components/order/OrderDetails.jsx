import React from 'react'
import { IoIosClose } from "react-icons/io";

function OrderDetails({ isOpen, setIsOrderDetailsOpen }) {
  return (
    <div className={`fixed z-50 inset-0 bg-black bg-opacity-80 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* <div className='fixed bg-white w-[800px] overflow-y-auto flex items-center justify-center'> */}
      <div className='fixed inset-0 flex items-center justify-center'>
        <div className='bg-white w-[600px] p-4 rounded-md'>
          <div className='text-end text-2xl hover:text-red-600'>
            <button onClick={() => setIsOrderDetailsOpen(false)}>
              <IoIosClose />
            </button>
          </div>
          <div className='grid gap-2 mb-4 pb-4 border-b-2'>
            <div className='flex items-center justify-between'>
              <p>Order ID</p>
              <label>5487921564610456</label>
            </div>
            <div className='flex items-center justify-between'>
              <p>Date</p>
              <label>27/10/2024</label>
            </div>
            <div className='flex items-center justify-between'>
              <p>Total Price</p>
              <label>$599.99</label>
            </div>
            <div className='flex items-center justify-between'>
              <p>Status</p>
              <label>In Process</label>
            </div>
          </div>
          <div className='grid gap-2 mb-4 pb-4'>
            <div className='font-medium'>Order Details</div>
            <ul>
              <li className='flex items-center justify-between'>
                <span>product one</span>
                <span>$299.99</span>
              </li>
              <li className='flex items-center justify-between'>
                <span>product two</span>
                <span>$299.99</span>
              </li>
            </ul>
          </div>
          <div className='grid gap-2 mb-4 pb-4'>
            <div className='font-medium'>Shipping Info</div>
            <div className='grid gap-0.5 text-gray-400'>
              <span>Hana Samy</span>
              <span>Fifth Settlement</span>
              <span>105</span>
              <span>Cairo</span>
              <span>01036945287</span>
              <span>Al Ahly Club</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default OrderDetails
