import React from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '../products/ProductCard';

function FeaturedProducts({ categoryList, productList }) {
    return (
        <div className='my-6'>
            {categoryList?.map((cat) => {
                return (
                    <div key={cat?._id} className='mb-10'>
                        <div className='flex items-center justify-between mb-4'>
                            <p className='capitalize font-semibold text-xl sm:text-2xl'>{cat.title}</p>
                            <button className='bg-blue-500 text-white px-3 py-1 font-medium text-sm sm:text-base'>
                                <Link to={`/shop/categories/${cat.slug}/${cat._id}`}>Shop Now</Link>
                            </button>
                        </div>
                        <Swiper
                            slidesPerView={1.2}
                            spaceBetween={20}
                            className="mySwiper"
                            breakpoints={{
                                500: { slidesPerView: 2.5, spaceBetween: 15 },
                                800: { slidesPerView: 3.5, spaceBetween: 15 },
                                1024: { slidesPerView: 4.5, spaceBetween: 20 },
                                1290: { slidesPerView: 5, spaceBetween: 20 },
                            }}>
                            {
                                productList
                                    ?.filter(product => product.category._id === cat._id && product.salePrice > 0) // Filter by category and salePrice
                                    .slice(0, 10) // Limit to 10 products
                                    .map(filteredProduct => {
                                        return (
                                            <SwiperSlide key={filteredProduct._id}>
                                                <ProductCard product={filteredProduct} />
                                            </SwiperSlide>
                                        );
                                    })
                            }
                        </Swiper>

                    </div>
                )
            })}

        </div>
    )
}

export default FeaturedProducts
