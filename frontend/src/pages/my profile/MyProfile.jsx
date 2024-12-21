import React, { useState } from 'react'
import Orders from '../../components/account/order/Orders'
import Address from '../../components/account/address/Address'

function MyProfile() {

    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index) => {
        setToggleState(index)
    }
    return (
        <div className='py-6'>

            <div className='flex items-center '>
                <button onClick={() => toggleTab(1)} className={`${toggleState === 1 ? 'bg-white text-blue-500' : 'bg-gray-100 text-gray-500'} py-1 px-4 border-4 rounded-l-md border-gray-100`}>Orders</button>
                <button onClick={() => toggleTab(2)} className={`${toggleState === 2 ? 'bg-white text-blue-500' : 'bg-gray-100 text-gray-500'} py-1 px-4 border-4 rounded-r-md border-gray-100`}>Address</button>
            </div>
            <div className={toggleState === 1 ? 'block' : 'hidden'}>
                <Orders />
            </div>
            <div className={toggleState === 2 ? 'block' : 'hidden'}>
                <Address />
            </div>

        </div>
    )
}

export default MyProfile
