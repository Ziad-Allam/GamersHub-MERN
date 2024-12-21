import React from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../../features/auth-admin/authSlice';
import { FaComputer } from 'react-icons/fa6'
import { Link } from 'react-router-dom'


function Header({ open, setOpen }) {

  const dispatch = useDispatch()

  function handleLogout() {
    dispatch(logoutAdmin())
  }

  return (
    <header className='flex items-center justify-between px-4 py-3 bg-blue-600 border-b'>
      <button onClick={() => setOpen(true)} className='lg:hidden sm:block'>
        <RxHamburgerMenu />
        <span className='sr-only'>Menu</span>
      </button>
      <div className='flex flex-1 justify-end'>
        <button
          onClick={handleLogout}
          className='inline-flex gap-2 items-center rounded-md bg-gray-700 text-white px-4 py-2 text-sm font-medium shadow'>
          <IoIosLogOut />
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header
