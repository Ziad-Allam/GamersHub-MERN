import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBannerImages } from '../../features/banner/bannerSlice'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';

function Banner() {

  const dispatch = useDispatch()

  const { images } = useSelector((state) => state.banner.bannarImage)

  useEffect(() => {
    dispatch(getBannerImages())
  }, [])

  return (
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
          )) : null
      }
    </Swiper>
  )
}

export default Banner
