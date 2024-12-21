import React from 'react'
import { IoIosClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { toast } from 'react-toastify'
import useClickOutside from '../../hooks/useClickOutside';
import { RiUser3Line } from 'react-icons/ri'
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineLogout } from "react-icons/md";

function MobileUserSidebar({ isUserSidebarOpen, setIsUserSidebarOpen }) {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()).then(data => {
            if (data?.payload?.success) {
                setIsUserSidebarOpen(false)
            } else {
                toast.error('somthing wrong')
            }
        });
    };

    let domNode = useClickOutside(() => {
        setIsUserSidebarOpen(false)
    })

    return (
        <div className={`fixed z-50 inset-0 bg-black bg-opacity-80 transition-opacity ${isUserSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

            <div ref={domNode} className={`fixed top-0 right-0 w-full max-w-80 h-full shadow-xl bg-white overflow-y-auto transition-transform ${isUserSidebarOpen ? '-translate-x-0' : 'translate-x-full'}`}>

                <div className='p-4 mt-4  flex flex-col'>
                    <div className='flex justify-between items-center mb-4 border-b-2 pb-4'>
                        <div className=''>
                            <p className='text-xs'>Hello</p>
                            <span className='text-lg text-blue-500 font-medium'>Hana Samy</span>
                        </div>
                        <button onClick={() => { setIsUserSidebarOpen(false) }} className='text-2xl'>
                            <IoIosClose />
                        </button>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Link onClick={() => { setIsUserSidebarOpen(false) }} to='/my-profile' className='p-2'>
                            <div className='flex items-center gap-2'>
                                <RiUser3Line size={20} />
                                <p>My Profile</p>
                            </div>
                        </Link>
                        <Link onClick={() => { setIsUserSidebarOpen(false) }} to='' className='p-2'>
                            <div className='flex items-center gap-2'>
                                <LiaShippingFastSolid size={20} />
                                <p>My Orders</p>
                            </div>
                        </Link>
                        <Link onClick={() => { setIsUserSidebarOpen(false) }} to='' className='p-2'>
                            <div className='flex items-center gap-2'>
                                <GiReturnArrow size={20} />
                                <p>My Returns</p>
                            </div>
                        </Link>
                        <button onClick={handleLogout} className='text-start p-2'>
                            <div className='flex items-center gap-2'>
                                <MdOutlineLogout size={20} />
                                <p>Logout</p>
                            </div>
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default MobileUserSidebar
