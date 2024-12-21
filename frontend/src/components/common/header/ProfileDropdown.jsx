import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from '../../../features/auth/authSlice';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { RiUser3Line } from "react-icons/ri";
import useClickOutside from "../../../hooks/useClickOutside";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";

function ProfileDropdown() {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
    };

    let domNode = useClickOutside(() => {
        setIsOpen(false)
    })

    return (
        <div className="relative z-50" ref={domNode}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2">

                {isAuthenticated ?
                    (
                        <>
                            <div className="w-6 h-6 flex items-center justify-center bg-gray-300 border rounded-full text-sm text-black">
                                {user?.firstname[0]?.toUpperCase()}
                            </div>

                            <span className="capitalize text-sm">
                                {user.firstname} {user.lastname}
                            </span>
                        </>
                    )
                    :
                    (
                        <>
                            <RiUser3Line />
                            <span className="text-sm">Account</span>
                        </>
                    )
                }
                {isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </button>

            {isOpen && (
                <div className="absolute top-12 bg-blue-600 min-w-[150px] w-full p-2 rounded-md flex flex-col gap-2 text-sm">

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/my-profile"
                                className="hover:bg-orange-400 px-2 hover:text-black flex items-center gap-2"
                                onClick={() => setIsOpen(!isOpen)}>
                                <FaRegCircleUser />
                                <span>Profile</span>
                            </Link>
                            <button
                                className="hover:bg-orange-400 px-2 text-left hover:text-black flex items-center gap-2"
                                onClick={handleLogout}>
                                <MdOutlineLogout />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:bg-orange-400 px-2 hover:text-black">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="hover:bg-orange-400 px-2 hover:text-black">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;
