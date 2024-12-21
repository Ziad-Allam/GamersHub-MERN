import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/user/userSlice';
import { MdBlockFlipped } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

function Users() {

    const dispatch = useDispatch()

    const users = useSelector((state) => state.users.userList?.users)

    useEffect(() => {
        dispatch(getUsers())
    }, [])


    return (
        <div>

            <h1 className='text-3xl font-medium'>Users</h1>

            <div className="divide-y divide-gray-200">
                {users?.map((user) => (
                    <div
                        key={user._id}
                        className="py-6 flex flex-col sm:flex-row sm:items-center justify-between"
                    >
                        {/* User Details Section */}
                        <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold">
                                {user.firstname[0].toUpperCase()}
                            </div>

                            {/* User Info */}
                            <div>
                                <h3 className="text-lg font-semibold capitalize">
                                    {user.firstname} {user.lastname}
                                </h3>
                                <p className="text-sm text-gray-500">{user.email}</p>
                                <p className="text-sm text-gray-500">Mobile: {user.mobile}</p>
                                <p className="text-sm text-gray-500">Role: {user.role}</p>
                            </div>
                        </div>

                        {/* Status and Actions Section */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
                            {/* Status */}
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${user.isBlocked
                                    ? "bg-red-100 text-red-600"
                                    : "bg-green-100 text-green-600"
                                    }`}
                            >
                                {user.isBlocked ? "Blocked" : "Active"}
                            </span>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => toggleBlock(user._id)}
                                    className={`flex items-center  gap-1 px-4 py-2 text-sm rounded-md ${user.isBlocked
                                        ? "bg-green-500 text-white hover:bg-green-600"
                                        : "text-red-500 hover:text-white hover:bg-red-600"
                                        }`}
                                >
                                    <MdBlockFlipped size={20}/>
                                    {user.isBlocked ? "Unblock" : "Block"}
                                </button>
                                <button
                                    onClick={() => deleteUser(user._id)}
                                    className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                >
                                    <MdDeleteOutline size={20}/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default Users
