import React, { useEffect } from 'react'
import ProductCard from '../../components/products/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductsByBrand } from '../../features/products/productsSlice'
import ProductListingHeader from '../../components/products/ProductListingHeader'

function ProductsListByBrand() {

    const { id } = useParams()
    const dispatch = useDispatch()
    // const { productList } = useSelector((state) => state?.products)
    const { productList } = useSelector((state) => state?.products)
    const sort = useSelector((state) => state.sort.sort); // Access sort state from Redux

    useEffect(() => {
        dispatch(fetchProductsByBrand({ id, sortBy: sort }))
    }, [id,sort])
    return (
        <div className='py-6'>
            <ProductListingHeader title={productList.brandName} filteredProducts={productList.brandProducts} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {
                    productList.brandProducts?.map(productList =>
                        <ProductCard key={productList?._id} product={productList} />
                    )
                }
            </div>

        </div>
    )
}

export default ProductsListByBrand
