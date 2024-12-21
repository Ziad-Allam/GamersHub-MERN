import React, { useState } from 'react'
import { IoIosClose } from "react-icons/io";
import Form from '../components/common/Form'
import ImageUpload from '../components/ImageUpload';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../features/categories/categoriesSlice";
import { getAllBrands } from "../features/brand/brandSlice";
import { addProduct, deleteProduct, editProduct, getAllProducts } from '../features/product/productSlice';
import { toast } from 'react-toastify';

const initialState = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
}

function Products() {

  const [formData, setFormData] = useState(initialState)
  const [openCreateProduct, setOpenCreateProduct] = useState(false)
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imgLoadingState, setImgLoadingState] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const dispatch = useDispatch()

  useEffect(() => {
    if (openCreateProduct) [
      dispatch(getAllCategories()),
      dispatch(getAllBrands())
    ]
  }, [openCreateProduct])

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  const categoryList = useSelector((state) => state.categories.categoryList)
  const brandList = useSelector((state) => state.brands.brandList)
  const { productList } = useSelector((state) => state.products)

  const addProductFormControls = [
    {
      label: "Title",
      name: "title",
      elementType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      elementType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      elementType: "select",
      options: categoryList.map((subcategory) => ({
        id: subcategory._id,
        title: subcategory.title,
      })),
    },
    {
      label: "Brand",
      name: "brand",
      elementType: "select",
      options: brandList?.map((brands) => ({
        id: brands._id,
        title: brands.title,
      })),
    },
    {
      label: "Price",
      name: "price",
      elementType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      elementType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      elementType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];

  function onSubmit(event) {
    event.preventDefault()
    currentEditId !== null ?
      dispatch(editProduct({
        id: currentEditId,
        formData: { ...formData, image: uploadedImageUrl }
      })).then((data) => {
        if (data.payload.success) {
          dispatch(getAllProducts())
          setOpenCreateProduct(false)
          setCurrentEditId(null)
          setImageFile(null)
          setFormData(initialState)
          toast.success("Product eddited successfully")
        }
      }) :
      dispatch(
        addProduct({
          ...formData,
          image: uploadedImageUrl
        })
      ).then((data) => {
        if (data.payload.success) {
          dispatch(getAllProducts())
          setOpenCreateProduct(false)
          setImageFile(null)
          setFormData(initialState)
          toast.success("Product created successfully")
        }
      })
  }

  function handleDelete(productId) {
    dispatch(deleteProduct(productId)).then(data => {
      if (data.payload?.success) {
        dispatch(getAllProducts())
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
        <button onClick={() => setOpenCreateProduct(true)} className='rounded-md bg-gray-700 text-white px-4 py-2 text-sm font-medium shadow'>
          Add product
        </button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {
          productList && productList.length > 0 ?
            productList.map((productItem) => {
              return (
                <div
                  key={productItem._id}
                  className="relative overflow-hidden bg-gray-100 rounded-lg shadow-lg group hover:bg-gray-200 transition-all">
                  <img
                    src={productItem.image.url}
                    alt={productItem.title}
                    className="w-full h-60 object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg"
                      onClick={() => {
                        setFormData(productItem);
                        setOpenCreateProduct(true);
                        setCurrentEditId(productItem._id);
                      }}>
                      Edit
                    </button>
                    <button
                      className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg"
                      onClick={() => handleDelete(productItem?._id)}
                      >
                      Delete
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">{productItem.title}</h3>
                    <p className="text-sm text-gray-500">{productItem.description.slice(0, 80)}...</p>
                    <p className="font-semibold text-lg">${productItem.price.toFixed(2)}</p>
                  </div>
                </div>
              )
            }) : null
        }
      </div>

      <div className={`fixed z-50 inset-0 bg-black bg-opacity-80 transition-opacity ${openCreateProduct ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed top-0 right-0 w-full max-w-80 h-full bg-white overflow-y-auto transition-transform ${openCreateProduct ? '-translate-x-0' : 'translate-x-full'}`}>

          <div className=' flex-col  bg-background p-6 '>
            <div className='flex justify-between items-center'>
              <h1 className='text-xl font-bold'>{currentEditId !== null ? 'Edit product' : 'Add new product'}</h1>
              <button onClick={() => { setOpenCreateProduct(false); setCurrentEditId(null); setFormData(initialState) }} className='text-3xl'>
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
              schemaType="Product"
            />
            <div className='py-6'>
              <Form
                formControls={addProductFormControls}
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

export default Products