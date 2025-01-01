import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allCategories } from '../../../features/categories/categoriesSlice';
import { Link } from 'react-router-dom'
import Loading from '../../loading/Loading';

function NavItems() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allCategories())
    }, [dispatch])

    const { categoryList, isLoading } = useSelector((state) => state.categories)

    return (
        <div className='hidden lg:block'>

            {
                isLoading ?
                    <Loading type='navLoading' />
                    :
                    <div className='px-4 md:px-6 xl:px-36 border-b bg-white'>

                        <nav className='flex flex-col lg:flex-row gap-6'>
                            <Link className='capitalize font-semibold hover:underline py-3 text-base' to='/shop'>All Products</Link>
                            {categoryList?.map((category) => {
                                return (
                                    <Link className='capitalize font-semibold hover:underline py-3 text-base' to={`/shop/categories/${category.slug}/${category._id}`} key={category?._id}>{category.title}</Link>
                                )
                            })}
                        </nav>
                    </div>
            }
        </div>

    )
}

export default NavItems
