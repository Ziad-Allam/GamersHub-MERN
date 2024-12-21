import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { allCategories } from '../../features/categories/categoriesSlice'
import { allBrands } from '../../features/brands/brandsSlice'
import { IoIosClose } from 'react-icons/io'

function MobileProductFilter({ filters, handleFilter, openNavItems, setOpenNavItems }) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allCategories())
        dispatch(allBrands())
    }, [])

    const categoryList = useSelector((state) => state.categories.categoryList)
    const brandList = useSelector((state) => state.brands.brandList)

    return (

        <div className={`fixed z-50 inset-0 bg-black bg-opacity-80 transition-opacity ${openNavItems ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

            <div className={`fixed top-0 left-0 w-full max-w-80 h-full bg-white overflow-y-auto transition-transform ${openNavItems ? 'translate-y-0' : 'translate-y-full'}`}>

                <div className='p-4 mt-4'>
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='text-xl font-bold text-blue-500'>Filters</h1>
                        <button onClick={() => { setOpenNavItems(false) }} className='text-2xl'>
                            <IoIosClose size={28} />
                        </button>
                    </div>
                    <div className='rounded-lg shadow-sm'>
                        <div className='p-4 space-y-4'>
                            <div className='flex flex-col gap-4'>
                                <h3 className='text-base font-bold'>Categories</h3>
                                {categoryList?.map((cat) => {
                                    return (
                                        <div key={cat._id} className='flex items-center gap-2 font-medium'>
                                            <input
                                                checked={
                                                    filters &&
                                                    Object.keys(filters).length > 0 &&
                                                    filters['category'] &&
                                                    filters['category'].indexOf(cat?._id) > -1
                                                }
                                                onChange={() => { handleFilter('category', cat?._id) }}
                                                type="checkbox"
                                                value={cat?.title}
                                            />
                                            <span className='capitalize'>{cat?.title}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className='flex flex-col gap-4 pt-8'>
                                <h3 className='text-base font-bold'>Brands</h3>
                                {brandList?.map((cat) => {
                                    return (
                                        <div key={cat?._id} className='flex items-center gap-2 font-medium'>
                                            <input
                                                checked={
                                                    filters &&
                                                    Object.keys(filters).length > 0 &&
                                                    filters['brand'] &&
                                                    filters['brand'].indexOf(cat?._id) > -1
                                                }
                                                onChange={() => { handleFilter('brand', cat?._id) }}
                                                type="checkbox"
                                                value={cat?.title}
                                            />
                                            <span className='capitalize'>{cat?.title}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default MobileProductFilter
