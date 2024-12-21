import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../../features/sort/sortSlice';

function ProductListingHeader({title,filteredProducts}) {

    const sort = useSelector((state) => state.sort.sort); // Access sort state from Redux
    const dispatch = useDispatch();

    function handleSort(e) {
        dispatch(setSort(e.target.value)); // Update sort state in Redux
    }

    return (
        <div className='pb-6 border-b flex items-center justify-between mb-6'>
            <h2 className='capitalize text-lg md:text-2xl font-medium'>{title}</h2>
            <div className='flex gap-8 items-center'>
                <span className='text-sm md:text-lg'>{filteredProducts?.length} Products</span>
                <div className='hidden lg:flex items-center gap-2'>
                    <span className='text-sm md:text-lg'>Sort By:</span>
                    <select value={sort} onChange={handleSort} className='border border-gray-300 px-2 text-gray-900 text-sm md:text-base rounded'>
                        <option value="price">Price: Low to High</option>
                        <option value="-price">Price: High to Low</option>
                        <option value="title">Title: A to Z</option>
                        <option value="-title">Title: Z to A</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default ProductListingHeader
