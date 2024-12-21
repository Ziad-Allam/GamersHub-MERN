import React, { useState } from 'react'
import { MdOutlineDelete } from "react-icons/md";

function AddressCard({ addressInfo,handleDeleteAddress,handleEdit,setSelectedAddress,index }) {

  const [isSelected, setIsSelected] = useState(false);

  return (
    
    // <div onClick={()=>setSelectedAddress(addressInfo)} className='border border-gray-300 rounded-md p-4 hover:border-blue-500 hover:bg-blue-50'>
    <div onClick={()=>{setSelectedAddress(addressInfo); setIsSelected(!isSelected)}} className={`border rounded-lg p-6 shadow-md transition-all duration-200 ${
      isSelected ? "bg-blue-100 border-blue-500" : "hover:bg-blue-50"
    }`}>
      <h2 className='font-bold py-4 text-xl'>Address {index+1}</h2>
      <div className='grid gap-2 mb-6 text-sm'>
        <label> <span className='font-bold'>Full name:</span> {addressInfo.fullName}</label>
        <label> <span className='font-bold'>Street name:</span> {addressInfo.streetName}</label>
        <label> <span className='font-bold'>Building no/name:</span> {addressInfo.buildingNo}</label>
        <label> <span className='font-bold'>City:</span> {addressInfo.city}</label>
        <label> <span className='font-bold'>Phone:</span> {addressInfo.phone}</label>
        <label> <span className='font-bold'>Landmark:</span> {addressInfo.landmark}</label>
      </div>
      {/* <div className='flex items-center justify-between'>
        <button onClick={()=>handleEdit(addressInfo)} className='px-4'>Edit</button>
        <button onClick={()=>handleDeleteAddress(addressInfo)} className='px-4'>Delete</button>
      </div> */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(addressInfo);
          }}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
          className="text-red-600 hover:underline flex items-center"
        >
          <MdOutlineDelete size={18} className="mr-1" /> Delete
        </button>
      </div>
    </div>
  )
}

export default AddressCard
