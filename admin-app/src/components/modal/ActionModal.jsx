import React from 'react'

function ActionModal() {
    function onSubmit(event) {
        event.preventDefault()
        currentEditId !== null ?
          dispatch(editProduct({
            id: currentEditId,
            formData
          })).then((data) => {
            console.log(data, "edit")
            if (data.payload.success) {
              dispatch(getAllProducts())
              setOpenCreateProduct(false)
              setCurrentEditId(null)
              // setImageFile(null)
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
      function isFormValid() {
        return Object.keys(formData).map(key => formData[key] !== '').every((item) => item);
      }
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
          options: brandList.map((brands) => ({
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
            
  return (
    <>
            <div className={`${openCreateProduct ? 'fixed right-0 top-0 w-64 bg-gray-100 ease-in duration-500' : 'fixed right-[-100%] top-0 ease-in duration-500'} h-screen w-96 overflow-auto`}>
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

    </>
  )
}

export default ActionModal
