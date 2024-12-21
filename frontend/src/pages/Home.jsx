import React, { useEffect } from 'react'
import Banner from '../components/home/Banner'
import { allCategories } from '../features/categories/categoriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../features/products/productsSlice'
import Categories from '../components/home/Categories'
import FeaturedProducts from '../components/home/FeaturedProducts'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

function Home() {

    const dispatch = useDispatch()
    const { categoryList } = useSelector((state) => state.categories)
    const { filteredProducts } = useSelector((state) => state.products.productList)

    useEffect(() => {
        dispatch(allCategories())
    }, [])

    useEffect(() => {
        dispatch(getAllProducts({}))
    }, [])

    return (
        <div>
            <Banner />
            <Categories categoryList={categoryList} />
            <FeaturedProducts categoryList={categoryList} productList={filteredProducts} />
        </div>
    )
}

export default Home
