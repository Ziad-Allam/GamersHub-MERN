import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductsByCategory } from '../../features/products/productsSlice'
import ProductCard from '../../components/products/ProductCard'
import ProductListingHeader from '../../components/products/ProductListingHeader'
import Loading from '../../components/loading/Loading'

function ProductsListByCategory() {

  const { categoryName, id } = useParams()
  const dispatch = useDispatch()
  // const { productList } = useSelector((state) => state.products)
  const { productList,isLoading } = useSelector((state) => state.products)
  const sort = useSelector((state) => state.sort.sort); // Access sort state from Redux

  useEffect(() => {
    dispatch(fetchProductsByCategory({ id, sortBy: sort }))
  }, [id, sort])
  return (
    <div className='py-6'>
      <ProductListingHeader title={productList.categoryName} filteredProducts={productList.productsCategory} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 ">
        {
          isLoading ?
            <Loading repeat={15} type="productCard" />
            :
            productList.productsCategory?.map(productList =>
              <ProductCard key={productList._id} product={productList} />
            )
        }
      </div>

    </div>
  )
}

export default ProductsListByCategory
