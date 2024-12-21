import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function CheckAuth({ isAuthenticated, user, children }) {

    const location = useLocation()

    if (!isAuthenticated && !(location.pathname.includes('/login-admin'))) {
        return <Navigate to={"/auth/login-admin"} />
    }
    if (isAuthenticated && (location.pathname.includes('/login-admin'))) {
        if (user.role === "user") {
            return <div>Error</div>
        } else {
            return <Navigate to={"/"} />
        }
    }
    return <>{children}</>
}

export default CheckAuth
