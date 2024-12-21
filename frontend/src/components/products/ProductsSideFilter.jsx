import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allCategories } from '../../features/categories/categoriesSlice'
import { allBrands } from '../../features/brands/brandsSlice'

function ProductsSideFilter({ filters, handleFilter }) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allCategories())
    dispatch(allBrands())
  }, [])

  const categoryList = useSelector((state) => state.categories.categoryList)
  const brandList = useSelector((state) => state.brands.brandList)

  return (
    <div className='hidden lg:block'>
      <div className='rounded-lg shadow-sm'>
        <div className='p-4 border-b'>
          <h2 className='text-lg font-semibold'>Filters</h2>
        </div>

        <div className='p-4 space-y-4'>
          <div className='flex flex-col gap-4'>
            <h3 className='text-base font-bold'>Categories</h3>
            {categoryList?.map((cat) => {
              return (
                <div key={cat._id} className='flex items-center gap-2 font-medium'>
                  <input
                    checked={
                      filters &&
                      Object.keys(filters).length > 0 &&
                      filters['category'] &&
                      filters['category'].indexOf(cat?._id) > -1
                    }
                    onChange={() => { handleFilter('category', cat?._id) }}
                    type="checkbox"
                    value={cat?.title}
                  />
                  <span className='capitalize'>{cat?.title}</span>
                </div>
              )
            })}
          </div>

          <div className='flex flex-col gap-4 pt-8'>
            <h3 className='text-base font-bold'>Brands</h3>
            {brandList?.map((cat) => {
              return (
                <div key={cat?._id} className='flex items-center gap-2 font-medium'>
                  <input
                    checked={
                      filters &&
                      Object.keys(filters).length > 0 &&
                      filters['brand'] &&
                      filters['brand'].indexOf(cat?._id) > -1
                    }
                    onChange={() => { handleFilter('brand', cat?._id) }}
                    type="checkbox"
                    value={cat?.title}
                  />
                  <span className='capitalize'>{cat?.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsSideFilter
