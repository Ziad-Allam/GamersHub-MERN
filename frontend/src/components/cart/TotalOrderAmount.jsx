import React from 'react'

function TotalOrderAmount({ totalCartAmount, totalDiscount, subtotalAmount }) {
    return (
        <>
            <div className='flex flex-col gap-1 border-b-2 border-gray-300 pb-3'>
                <div className='flex items-center justify-between'>
                    <span className=''>Subtotal</span>
                    <span className=''>${subtotalAmount.toFixed(2)}</span>
                </div>
                <div className='flex items-center justify-between'>
                    <span className='text-'>Saving</span>
                    <span className='text-'>(${totalDiscount}.00)</span>
                </div>
                <div className='flex items-center justify-between'>
                    <span className=''>Shipping Fee</span>
                    <span className=''>Free</span>
                </div>
                <div className='flex items-center justify-between'>
                    <span className=''>VAT (14%)</span>
                    <span className=''>$50.00</span>
                </div>
            </div>

            <div className='flex items-center justify-between mt-4'>
                <span className='text-2xl font-bold'>Total</span>
                <span className='text-2xl font-bold'>${totalCartAmount.toFixed(2)}</span>
            </div>
        </>
    )
}

export default TotalOrderAmount
