import React from 'react'
import { IoMdCheckmark, IoMdClose } from 'react-icons/io'

function Availability({totalStock}) {
    return (
        <>
            {totalStock < 1
                ?
                <div className='flex items-center gap-2 text-red-600'>
                    <IoMdClose />
                    <span className='font-semibold'>OUT OF STOCK</span>
                </div>
                :
                <div>
                    <div className='flex items-center gap-2 text-green-600'>
                        <IoMdCheckmark />
                        <span className='font-semibold'>IN STOCK</span>
                    </div>
                </div>
            }

        </>
    )
}

export default Availability
