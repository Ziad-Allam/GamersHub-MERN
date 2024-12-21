import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function CheckAuth({ isAuthenticated, user, children }) {

    const location = useLocation()

    // console.log(location.pathname,isAuthenticated)

    if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        return <Navigate to={"/login"} />
    }
    if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        if (user.role === "admin") {
            return <div>Error</div>
        } else {
            return <Navigate to={"/"} />
        }
    }
    return <>{children}</>
}

export default CheckAuth
