import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins } from '../features/user/userSlice';
import { MdBlockFlipped } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Form from '../components/common/Form';
import { IoIosClose } from 'react-icons/io';
import { createAdmin } from '../components/common/config';

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
}

function Admins() {

    const dispatch = useDispatch()

    const [formData, setFormData] = useState(initialState)
    const [openCreateAdmin, setOpenCreateAdmin] = useState(false)
    const [currentEditId, setCurrentEditId] = useState(null);

    const admins = useSelector((state) => state.users.userList?.admins)

    useEffect(() => {
        dispatch(getAdmins())
    }, [])

    function onSubmit(event) {
        event.preventDefault()
    }


    function isFormValid() {
        return Object.keys(formData).map(key => formData[key] !== '').every((item) => item);
    }


    return (
        <div>

            <div className='flex justify-end w-full'>
                <button onClick={() => setOpenCreateAdmin(true)} className='rounded-md bg-gray-700 text-white px-4 py-2 text-sm font-medium shadow'>
                    Add Admin
                </button>
            </div>


            <div className="divide-y divide-gray-200">
                {admins?.map((admin) => (
                    <div
                        key={admin._id}
                        className="py-6 flex flex-col sm:flex-row sm:items-center justify-between"
                    >
                        {/* admin Details Section */}
                        <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold">
                                {admin.firstname[0].toUpperCase()}
                            </div>

                            {/* admin Info */}
                            <div>
                                <h3 className="text-lg font-semibold capitalize">
                                    {admin.firstname} {admin.lastname}
                                </h3>
                                <p className="text-sm text-gray-500">{admin.email}</p>
                                <p className="text-sm text-gray-500">Mobile: {admin.mobile}</p>
                                <p className="text-sm text-gray-500">Role: {admin.role}</p>
                            </div>
                        </div>

                        {/* Status and Actions Section */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
                            {/* Status */}
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${admin.isBlocked
                                    ? "bg-red-100 text-red-600"
                                    : "bg-green-100 text-green-600"
                                    }`}
                            >
                                {admin.isBlocked ? "Blocked" : "Active"}
                            </span>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => toggleBlock(admin._id)} // Add toggle logic
                                    className={`flex items-center  gap-1 px-4 py-2 text-sm rounded-md ${admin.isBlocked
                                        ? "bg-green-500 text-white hover:bg-green-600"
                                        : "text-red-500 hover:text-white hover:bg-red-600"
                                        }`}
                                >
                                    <MdBlockFlipped size={20} />
                                    {admin.isBlocked ? "Unblock" : "Block"}
                                </button>
                                <button
                                    onClick={() => deleteUser(admin._id)} // Add delete logic
                                    className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                >
                                    <MdDeleteOutline size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`fixed z-50 inset-0 bg-black bg-opacity-80 transition-opacity ${openCreateAdmin ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

                <div className={`fixed top-0 right-0 w-full max-w-80 h-full bg-white overflow-y-auto transition-transform ${openCreateAdmin ? '-translate-x-0' : 'translate-x-full'}`}>
                    {/* <div className={`${openCreateCategory ? 'fixed right-0 top-0 w-64 bg-gray-100 ease-in duration-500' : 'fixed right-[-100%] top-0 ease-in duration-500'} h-screen w-96 overflow-auto`}> */}
                    <div className=' flex-col  bg-background p-6 '>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-xl font-bold'>{currentEditId !== null ? 'Edit Category' : 'Add new Category'}</h1>
                            <button onClick={() => { setOpenCreateAdmin(false); setCurrentEditId(null); setFormData(initialState) }} className='text-3xl'>
                                <IoIosClose />
                            </button>
                        </div>
                        <div className='py-6'>
                            <Form
                                formControls={createAdmin}
                                buttonText={currentEditId !== null ? 'Edit' : 'Add'}
                                formData={formData}
                                setFormData={setFormData}
                                onSubmit={onSubmit}
                                isBtnDisabled={!isFormValid()}
                            />
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Admins
