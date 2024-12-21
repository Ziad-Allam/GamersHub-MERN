import React, { useEffect, useState } from 'react'
import { addBrandFormControls } from '../components/common/config'
import Form from '../components/common/Form'
import { IoIosClose } from 'react-icons/io'
import ImageUpload from '../components/ImageUpload'
import { useDispatch, useSelector } from 'react-redux'
import { createBrand, deleteBrand, editBrand, getAllBrands } from '../features/brand/brandSlice'
import { toast } from 'react-toastify';
import { MdDeleteOutline } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'

const initialState = {
  image: null,
  title: "",
}

function Brands() {
  const [formData, setFormData] = useState(initialState)
  const [openCreateBrand, setOpenCreateBrand] = useState(false)
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState({});
  const [imgLoadingState, setImgLoadingState] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const { brandList } = useSelector((state) => state.brands)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBrands())
  }, [])

  function onSubmit(event) {
    event.preventDefault()
    currentEditId !== null ?
      dispatch(editBrand({
        id: currentEditId,
        formData: { ...formData, image: uploadedImageUrl }
      })).then((data) => {
        if (data.payload.success) {
          dispatch(getAllBrands())
          setOpenCreateBrand(false)
          setCurrentEditId(null)
          setImageFile(null)
          setFormData(initialState)
          toast.success("Product eddited successfully")
        }
      }) :
      dispatch(
        createBrand({
          ...formData,
          image: uploadedImageUrl
        })
      ).then((data) => {
        if (data.payload.success) {
          dispatch(getAllBrands())
          setOpenCreateBrand(false)
          setImageFile(null)
          setFormData(initialState)
          toast.success("Product created successfully")
        }
      })
  }

  function handleDelete(productId) {
    dispatch(deleteBrand(productId)).then(data => {
      if (data.payload.success) {
        dispatch(getAllBrands())
        toast.success("Product deleted successfully")
      }
    })
  }

  function isFormValid() {
    return Object.keys(formData).map(key => formData[key] !== '').every((item) => item);
  }

  return (
    <>
      <div className='flex justify-end w-full'>
        <button onClick={() => setOpenCreateBrand(true)} className='rounded-md bg-gray-700 text-white px-4 py-2 text-sm font-medium shadow'>
          Add brand
        </button>
      </div>
      <div>
        {
          brandList && brandList.length > 0 ? brandList.map((brandInfo) => {
            return (
              <div key={brandInfo._id} className="flex flex-col sm:flex-row items-center justify-between border-b py-4">
                {/* Image */}
                <div className="w-24 flex-shrink-0 mb-4 sm:mb-0">
                  <img src={brandInfo.image?.url} alt="" className="w-24 h-24 object-cover" />
                </div>

                {/* Title and ID */}
                <div className="flex flex-col flex-1 sm:px-4 items-center sm:items-start gap-2">
                  <p className="text-lg font-semibold text-center sm:text-left capitalize">{brandInfo.title}</p>
                  <p className="text-sm text-gray-500 uppercase text-center sm:text-left">{brandInfo._id}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 sm:gap-6 mt-4 sm:mt-0">
                  <button
                    className='text-green-500 font-medium bg-gray-100 p-1 text-2xl rounded-md hover:bg-gray-200'
                    onClick={() => {
                      setOpenCreateBrand(true);
                      setCurrentEditId(brandInfo?._id);
                      setFormData(brandInfo);
                    }}>
                    <CiEdit />
                  </button>
                  <button className='text-red-500 font-medium bg-gray-100 p-1 text-2xl rounded-md hover:bg-gray-200' onClick={() => handleDelete(brandInfo?._id)}><MdDeleteOutline /></button>
                </div>
              </div>
            )
          })
            :
            null
        }

      </div>

      <div className={`fixed z-50 inset-0 bg-black bg-opacity-80 transition-opacity ${openCreateBrand ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed top-0 right-0 w-full max-w-80 h-full bg-white overflow-y-auto transition-transform ${openCreateBrand ? '-translate-x-0' : 'translate-x-full'}`}>
          <div className=' flex-col  bg-background p-6 '>
            <div className='flex justify-between items-center'>
              <h1 className='text-xl font-bold'>{currentEditId !== null ? 'Edit brand' : 'Add new brand'}</h1>
              <button onClick={() => { setOpenCreateBrand(false); setCurrentEditId(null); setFormData(initialState) }} className='text-3xl'>
                <IoIosClose />
              </button>
            </div>
            <ImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imgLoadingState={imgLoadingState}
              setImgLoadingState={setImgLoadingState}
              formData={formData}
              currentEditId={currentEditId}
              schemaType="Brand"
            />
            <div className='py-6'>
              <Form
                formControls={addBrandFormControls}
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
    </>
  )
}

export default Brands