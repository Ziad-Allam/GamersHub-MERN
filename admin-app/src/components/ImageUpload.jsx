import React, { useEffect, useRef } from 'react'
import { IoCloudUploadOutline, IoImageOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ImageUpload({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, imgLoadingState, setImgLoadingState, formData, currentEditId,schemaType, isCurrentStyling }) {

    const inputRef = useRef(null)

    function handleImageFile(event) {
        const selectedFile = event.target.files[0]
        if (selectedFile) setImageFile(selectedFile)
    }

    function handleDragOver(event) {
        event.preventDefault()
    }

    function handleDrop(event) {
        event.preventDefault()
        const droppedFile = event.dataTransfer.files?.[0]
        if (droppedFile) setImageFile(droppedFile)
    }

    function handleRemoveImage() {
        setImageFile(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    async function uploadImgToCloudinary() {
        setImgLoadingState(true)
        const data = new FormData()
        data.append('my_file', imageFile)
        const response = await axios.post('http://localhost:5000/api/admin/product/upload-image', data)
        if (response?.data.success) {
            setUploadedImageUrl({ url: response.data.result.url, public_id: response.data.result.public_id })
            setImgLoadingState(false)
        }
    }

    async function handleImageDelete(publicId, itemId, schemaType) {
        const response = await axios.delete('http://localhost:5000/api/admin/product/delete-image', {
            data: { public_id: publicId, itemId, schemaType }
        });

        if (response?.data.success) {
            console.log("Image deleted successfully");
            // setUploadedImageUrl(null); // Clear the image URL
        } else {
            console.error("Image deletion failed:", response?.data.message);
        }
    }

    useEffect(() => {
        if (imageFile !== null) uploadImgToCloudinary()
    }, [imageFile])

    return (
        <div className={`w-full mt-4 ${isCurrentStyling?'':'max-w-md mx-auto'}`}>
            <label className='mb-3 font-semibold block' htmlFor="">Upload Image</label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4'>
                <input className='hidden' id='image-upload' type='file' ref={inputRef} onChange={handleImageFile} />
                {
                    !imageFile ? (
                        formData?.image === null || formData?.image === undefined ?
                            <label htmlFor="image-upload" className='flex flex-col items-center justify-center cursor-pointer'>
                                <div className='text-4xl mb-2'>
                                    <IoCloudUploadOutline />
                                </div>
                                <span>Drag & drop or click to upload image</span>
                            </label>
                            :
                            <div className='relative'>
                                <div className=''>
                                    <img src={formData?.image?.url} alt="" className='' />
                                </div>
                                <button className='absolute top-4 right-4 text-2xl bg-red-500 text-white font-bold rounded-md' onClick={() => handleImageDelete(formData?.image?.public_id, currentEditId, schemaType)} >
                                    <IoIosClose />
                                </button>
                            </div>
                    ) : (
                        imgLoadingState ?
                            <Skeleton /> :
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center text-xl'>
                                    <IoImageOutline />
                                </div>
                                <p className='text-sm font-medium'>{imageFile.name}</p>
                                <button className='' onClick={handleRemoveImage}>
                                    <div className='text-xl'>
                                        <IoIosClose />
                                    </div>
                                </button>
                            </div>
                    )}
            </div>
        </div>
    )
}

export default ImageUpload
