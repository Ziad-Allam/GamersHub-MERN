import React, { useEffect } from 'react'
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { allCategories } from '../../features/categories/categoriesSlice';
import { Link } from 'react-router-dom'
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import useClickOutside from '../../hooks/useClickOutside';

function MobileSideNav({ openNavItems, setOpenNavItems }) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allCategories())
    }, [dispatch])

    let domNode = useClickOutside(() => {
        setOpenNavItems(false)
    })

    const { categoryList } = useSelector((state) => state.categories)

    return (
        <div className={`fixed z-50 inset-0 bg-black bg-opacity-80 transition-opacity ${openNavItems ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

            <div ref={domNode} className={`fixed top-0 left-0 w-full max-w-80 h-full bg-white overflow-y-auto transition-transform ${openNavItems ? 'translate-x-0' : '-translate-x-full'}`}>

                <div className='p-4 mt-4'>
                    <div className='flex justify-between items-center mb-4 border-b-2 pb-6'>
                        <h1 className='text-blue-500 text-xl font-bold'>Categories</h1>
                        <button onClick={() => { setOpenNavItems(false) }}>
                            <IoIosClose size={28} />
                        </button>
                    </div>

                    <nav className=''>
                        <ul className='mb-8'>
                            <li className='py-3 border-b'>
                                <Link onClick={() => { setOpenNavItems(false) }} className='capitalize font-medium' to='/shop'>All Products</Link>
                            </li>
                            {categoryList?.map((category) => {
                                return (
                                    <li key={category?._id} className='py-3 border-b'>
                                        <Link onClick={() => { setOpenNavItems(false) }} className='capitalize font-medium' to={`/shop/categories/${category.slug}/${category._id}`} key={category?._id}>{category.title}</Link>
                                    </li>
                                )
                            })}
                        </ul>

                        <ul className='flex items-center justify-center gap-2'>
                            <li className='p-2 bg-gray-200 rounded-md'>
                                <FaFacebook size={20} />
                            </li>
                            <li className='p-2 bg-gray-200 rounded-md'>
                                <FaInstagram size={20} />
                            </li>
                            <li className='p-2 bg-gray-200 rounded-md'>
                                <FaXTwitter size={20} />
                            </li>
                            <li className='p-2 bg-gray-200 rounded-md'>
                                <FaLinkedin size={20} />
                            </li>
                        </ul>

                    </nav>


                </div>

            </div>

        </div>
    )
}

export default MobileSideNav
