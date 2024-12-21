import React from 'react'
import { RiUser3Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'

function MobileUserIcon({ isAuthenticated, user, setIsUserSidebarOpen }) {
    return (
        <>
            {isAuthenticated ? (
                <button
                    onClick={() => setIsUserSidebarOpen(true)}>
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-300 border rounded-full text-sm text-black">
                        {user?.firstname[0]?.toUpperCase()}
                    </div>
                </button>
            ) : (
                <Link to="/login">
                    <RiUser3Line size={24} />
                </Link>
            )}
        </>
    )
}

export default MobileUserIcon
