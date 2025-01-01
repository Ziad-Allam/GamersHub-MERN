import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';
import { useSelector } from 'react-redux';

function Categories() {

    const { categoryList, isLoading } = useSelector((state) => state.categories)

    return (
        <div className='py-8'>
            {isLoading ?
                <Loading type='categories' />
                :
                <Swiper
                    slidesPerView={3.5}
                    spaceBetween={5}
                    className="mySwiper"
                    breakpoints={{
                        500: { slidesPerView: 4.5, spaceBetween: 5 },
                        800: { slidesPerView: 5.5, spaceBetween: 5 },
                        1024: { slidesPerView: 7.5, spaceBetween: 5 },
                        1290: { slidesPerView: 10, spaceBetween: 5 },
                    }}>

                    {categoryList?.map((category) => {
                        return (
                            <SwiperSlide key={category?._id}>
                                <Link to={`/shop/categories/${category.slug}/${category._id}`}>
                                    <div className='flex flex-col items-center gap-2 '>
                                        <div className='w-16 h-16 sm:w-24 sm:h-24 relative'>
                                            <img src={category?.image.url} alt="" className=' object-cover' />
                                        </div>
                                        <p className='capitalize text-xs sm:text-base font-semibold text-center'>{category?.title}</p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            }

        </div>
    )
}

export default Categories