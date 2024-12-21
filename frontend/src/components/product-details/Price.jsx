import React from 'react'

function Price({ price, salePrice }) {
    return (
        <div className='flex flex-col gap-2'>
            {
                salePrice ?
                    <>
                        <div className='text-gray-500 flex items-center gap-4'>Was:<span className='line-through'>{price}</span></div>
                        <div className='flex items-center gap-4'>
                            Now:
                            <span className='text-3xl font-semibold'>${salePrice}</span>
                        </div>
                        <div className='flex items-center gap-4'>
                            Save:
                            <div className='font-medium'>
                                ${price - salePrice}
                            </div>
                            <span className='text-xs text-green-500 font-medium rounded-md'>{Math.floor(((price - salePrice) / price) * 100)}% off</span>
                        </div>
                    </>
                    :
                    <div className='flex items-center gap-4'>
                        Now:
                        <span className='text-3xl font-semibold'>${price}</span>
                    </div>
            }
        </div>
    )
}

export default Price
