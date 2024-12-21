import React from 'react'
import { useSelector } from 'react-redux'

function ProductList({ productItem, setOpenCreateProduct, setCurrentEditId, setFormData ,handleDelete}) {
    {/* <div className="grid grid-cols-5 gap-4 p-6 bg-gray-100">
        <div className="font-bold text-gray-700 bg-gray-200 p-2">Title</div>
        <div className="font-bold text-gray-700 bg-gray-200 p-2">Brand</div>
        <div className="font-bold text-gray-700 bg-gray-200 p-2">Category</div>
        <div className="font-bold text-gray-700 bg-gray-200 p-2">Price</div>
        <div className="font-bold text-gray-700 bg-gray-200 p-2">Action</div>

        {productList.map((item) => (
          <React.Fragment key={item.id}>
            <div className="p-2 bg-white border border-gray-300">{item.title}</div>
            <div className="p-2 bg-white border border-gray-300">{item.brand}</div>
            <div className="p-2 bg-white border border-gray-300">{item.category}</div>
            <div className="p-2 bg-white border border-gray-300">{item.price}</div>
            <div className="p-2 bg-white border border-gray-300">
              <div className=' flex gap-4'>
                <button className='font-semibold bg-green-500 px-4'>Edit</button>
                <button className='font-semibold bg-red-500 px-4'>Delete</button>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div> */}


    return (
        <div className="w-full max-w-sm mx-auto">
            <div>
                <div className="relative">
                    <img
                        src={productItem?.image?.url}
                        alt={productItem?.title}
                        className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2 mt-2">{productItem?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span
                            className={`${productItem?.salePrice > 0 ? "line-through" : ""
                                } text-lg font-semibold text-primary`}
                        >
                            ${productItem?.price}
                        </span>
                        {productItem?.salePrice > 0 ? (
                            <span className="text-lg font-bold">${productItem?.salePrice}</span>
                        ) : null}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => {
                            setOpenCreateProduct(true);
                            setCurrentEditId(productItem?._id);
                            setFormData(productItem);
                        }}
                    >
                        Edit
                    </button>
                    <button onClick={() => handleDelete(productItem?._id)}>Delete</button>
                </div>
            </div>
        </div>

    )
}

export default ProductList
