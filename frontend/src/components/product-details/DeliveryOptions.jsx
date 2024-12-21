import React from 'react'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { RiStore2Line } from 'react-icons/ri'

function DeliveryOptions() {

    const today = new Date();
    // Add one day to today's date to get tomorrow's date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    // Format the date as "Sat, Nov 2"
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(tomorrow);

    return (
        <div className='flex items-center gap-3 font-medium text-sm'>
            <div className='border border-gray-400 p-4 rounded-md'>
                <RiStore2Line className='text-2xl' />
                <p className=''>Pickup</p>
                <div className='mt-4'>
                    <p className='font-normal'>Ready within</p>
                    <p className=''>1 hour</p>
                </div>
            </div>
            <div className='border border-gray-400 p-4 rounded-md'>
                <LiaShippingFastSolid className='text-2xl' />
                <p className=''>Shipping</p>
                <div className='mt-4'>
                    <p className='font-normal'>get it by</p>
                    <p className=''>{formattedDate}</p>
                </div>
            </div>
        </div>
    )
}

export default DeliveryOptions
