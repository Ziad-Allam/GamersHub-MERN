import React from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { IoCartOutline, IoHomeOutline } from "react-icons/io5";
import { FcShipped } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { IoTicketOutline } from "react-icons/io5";
import { TbUsersGroup } from "react-icons/tb";
import { FcManager } from "react-icons/fc";

const sidebarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <IoHomeOutline />
    },
    {
        id: 'products',
        label: 'Products',
        path: '/products',
        icon: <IoCartOutline />
    },
    {
        id: 'categories',
        label: 'Categories',
        path: '/categories',
        icon: <LuLayoutDashboard />
    },
    {
        id: 'brands',
        label: 'Brands',
        path: '/brands',
        icon: <IoTicketOutline />
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/orders',
        icon: <FcShipped />
    },
    {
        id: 'users',
        label: 'Users',
        path: '/Users',
        icon: <TbUsersGroup />
    },
    {
        id: 'admins',
        label: 'Admins',
        path: '/admins',
        icon: <FcManager />
    },
]

function SidebarMenuItems({ setOpen }) {

    const navigate = useNavigate()

    return (
        <div className='flex flex-1 flex-col gap-2 mt-8'>
            {sidebarMenuItems.map((menuItem) => (
                <button key={menuItem.id} onClick={() => { navigate(menuItem.path); setOpen ? setOpen(false) : null }} className='flex text-xl items-center gap-2 rounded-md px-3 py-2 hover:bg-muted hover:text-foreground hover:bg-orange-400'>
                    {menuItem.icon}
                    <span>{menuItem.label}</span>
                </button>
            ))}
        </div>
    )
}

export default SidebarMenuItems
