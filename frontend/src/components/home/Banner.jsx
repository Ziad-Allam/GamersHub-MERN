import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBannerImages } from '../../features/banner/bannerSlice'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import Loading from '../loading/Loading';

function Banner() {

  const dispatch = useDispatch()

  const images = useSelector((state) => state.banner.bannarImage.images);
  const { isLoading } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(getBannerImages())
  }, [])

  return (
    <>
      {isLoading ?
        <Loading type='bannarLoading' />
        :

        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 3000, // Time between slides (in milliseconds)
            disableOnInteraction: false, // Keeps autoplay active even after manual interaction
          }}
          preventClicksPropagation={false}
          className="mySwiper">

          {
            images && images.length > 0 ?
              images.map(bannarImage => (
                <SwiperSlide key={bannarImage?._id}>
                  <img src={bannarImage.image.url} alt="" className='w-full h-64 sm:h-80 md:h-full object-cover' />
                </SwiperSlide>
              )) : <div className='w-full h-64 sm:h-80 md:h-[438px] object-cover bg-gray-200'>Image not available</div>

          }
        </Swiper>

      }

    </>
  )
}

export default Banner
