import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../features/products/productsSlice'
import ProductCard from '../../components/products/ProductCard'
import { useSearchParams } from 'react-router-dom'
import { FiFilter } from "react-icons/fi";
import ProductListingHeader from '../../components/products/ProductListingHeader'
import MobileProductFilter from '../../components/mobile/MobileProductFilter'
import ProductsSideFilter from '../../components/products/ProductsSideFilter'
import SidePanel from '../../components/common/SidePanel'

function ProductsList() {

    const dispatch = useDispatch()

    const { filteredProducts } = useSelector((state) => state.products.productList)
    const sort = useSelector((state) => state.sort.sort); // Access sort state from Redux

    const [filters, setFilters] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)

    function handleFilter(main, optionId) {
        let copyFilters = { ...filters }
        const indexOfCurrentSection = Object.keys(copyFilters).indexOf(main)
        if (indexOfCurrentSection === -1) {
            copyFilters = {
                ...copyFilters,
                [main]: [optionId]
            }
        } else {
            const indexOfCurrentOption = copyFilters[main].indexOf(optionId)
            if (indexOfCurrentOption === -1) copyFilters[main].push(optionId)
            else copyFilters[main].splice(indexOfCurrentOption, 1)
        }
        setFilters(copyFilters)
        sessionStorage.setItem('filters', JSON.stringify(copyFilters))
    }

    useEffect(() => {
        // if (filters !== null && sort !== null)
        dispatch(getAllProducts({ filterParams: filters, sortParams: sort }))
    }, [filters, sort])

    useEffect(() => {
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
    }, [])

    function createSearchParamsHelper(filterParams) {
        const queryParams = []
        for (const [key, value] of Object.entries(filterParams)) {
            if (Array.isArray(value) && value.length > 0) {
                const paramValue = value.join(',')
                queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
            }
        }
        return queryParams.join('&')
    }

    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
            const createQueryString = createSearchParamsHelper(filters)

            setSearchParams(new URLSearchParams(createQueryString))

        }
    }, [filters])



    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 py-6'>

                <ProductsSideFilter filters={filters} handleFilter={handleFilter} />

                <div className='rounded-lg shadow-sm w-full'>

                    <ProductListingHeader title='All products' filteredProducts={filteredProducts} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {
                            filteredProducts?.map(productList =>
                                <ProductCard key={productList?._id} product={productList} />
                            )
                        }
                    </div>

                    <div className='lg:hidden'>
                        <button onClick={() => { setIsFilterPanelOpen(true) }} className='fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-2 rounded-md shadow-md focus:outline-none z-40'>
                            <div className='flex items-center gap-1 text-sm'>
                                <span>Filter</span>
                                <FiFilter />
                            </div>
                        </button>
                    </div>

                </div>

            </div>

            <SidePanel isPanelOpen={isFilterPanelOpen} setIsPanelOpen={setIsFilterPanelOpen}>
                <MobileProductFilter filters={filters} handleFilter={handleFilter} />
            </SidePanel>
        </>
    )
}

export default ProductsList