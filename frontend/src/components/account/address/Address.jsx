import React, { useEffect, useState } from 'react'
import Form from '../../common/Form'
import { addAddressFormControls } from '../../common/config'
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress, deleteAddress, editAddress, featchAllAddresses } from '../../../features/address/addressSlice';
import { toast } from 'react-toastify';
import AddressCard from './AddressCard';

const initialState = {
    fullName: '',
    streetName: '',
    buildingNo: '',
    city: '',
    phone: '',
    landmark: '',
}

function Address({ setSelectedAddress }) {

    const dispatch = useDispatch()

    const [formData, setFormData] = useState(initialState)
    const [editedAddressId, setEditedAddressId] = useState(null)
    const { user } = useSelector((state) => state.auth)
    const { addressList } = useSelector((state) => state.address.addressList)

    function onSubmit(event) {
        event.preventDefault()

        if (addressList.length >= 3 && editedAddressId === null) {
            toast.error('You can add max 3 addresses')
            return
        }

        editedAddressId !== null ?
            dispatch(editAddress({
                userId: user?.id, addressId: editedAddressId, formData
            })).then((data) => {
                if (data?.payload?.success) {
                    // toast.success("logged in successfully")
                    dispatch(featchAllAddresses(user?.id))
                    setEditedAddressId(null)
                    setFormData(initialState)
                }
            })
            :
            dispatch(addNewAddress({ ...formData, userId: user?.id })).then(data => {
                if (data?.payload?.success) {
                    // toast.success("logged in successfully")
                    dispatch(featchAllAddresses(user?.id))
                    setFormData(initialState)
                }
                // else{
                //     toast.error('somthing wrong') 
                // }
            })
    }

    function handleEdit(currentAddress) {
        setEditedAddressId(currentAddress?._id)
        setFormData({
            ...formData,
            fullName: currentAddress.fullName,
            streetName: currentAddress.streetName,
            buildingNo: currentAddress.buildingNo,
            city: currentAddress.city,
            phone: currentAddress.phone,
            landmark: currentAddress.landmark,

        })
    }

    function handleDeleteAddress(currentAddress) {
        dispatch(deleteAddress({ userId: user?.id, addressId: currentAddress._id })).then(data => {
            if (data?.payload?.success) {
                // toast.success("logged in successfully")
                dispatch(featchAllAddresses(user?.id))
            }
            // else{
            //     toast.error('somthing wrong') 
            // }
        })
    }


    useEffect(() => {
        dispatch(featchAllAddresses(user?.id))
    }, [])

    return (
        <>
            <div className="py-6">
                <h1 className="text-3xl font-medium mb-1">Your Addresses</h1>
                <p className="text-gray-600">Add, edit, or delete your addresses below.</p>
            </div>

            <div className="px-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {addressList && addressList.length > 0 ? (
                    addressList.map((singleAddressItem, index) => (
                        <AddressCard
                            key={singleAddressItem._id}
                            addressInfo={singleAddressItem}
                            handleDeleteAddress={handleDeleteAddress}
                            handleEdit={handleEdit}
                            setSelectedAddress={setSelectedAddress}
                            index={index}
                        />
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-600">
                        No addresses found. Add a new address below.
                    </p>
                )}
            </div>

            <div className="border rounded-lg shadow-md p-6 bg-white">
                <h2 className="text-2xl font-semibold mb-4">
                    {editedAddressId !== null ? "Edit Address" : "Add New Address"}
                </h2>
                <Form
                    formControls={addAddressFormControls}
                    buttonText={editedAddressId !== null ? "Edit" : "Add"}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit}
                />
            </div>
        </>
    )
}

export default Address
