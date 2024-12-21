import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

function Categories({ categoryList }) {
    return (
        <div className='py-8'>
            <Swiper
                slidesPerView={2.5}
                spaceBetween={5}
                className="mySwiper"
                breakpoints={{
                    500: { slidesPerView: 3.5, spaceBetween: 5 },
                    800: { slidesPerView: 5.5, spaceBetween: 5 },
                    1024: { slidesPerView: 7.5, spaceBetween: 5 },
                    1290: { slidesPerView: 10, spaceBetween: 5 },
                }}>

                {categoryList?.map((category) => {
                    return (
                        <SwiperSlide key={category?._id}>
                            <Link to={`/shop/categories/${category.slug}/${category._id}`}>
                                <div className='flex flex-col items-center gap-2 '>
                                    <div className='w-20 h-20 sm:w-24 sm:h-24 relative'>
                                        <img src={category?.image.url} alt="" className=' object-cover' />
                                    </div>
                                    <p className='capitalize text-sm sm:text-base font-semibold'>{category?.title}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>

        </div>
    )
}

export default Categories