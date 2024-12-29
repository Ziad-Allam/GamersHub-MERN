import React from 'react'
import { ThreeDot } from 'react-loading-indicators'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading({ repeat, type }) {
    const ProductCardLoading = () => (
        <div className='w-full border border-gray-300 p-2 rounded-md'>
            <Skeleton className='h-[300px]' />
            <div className='py-2 flex flex-grow flex-col gap-2'>
                <div className='h-10'>
                    <Skeleton count={2} />
                </div>
                <Skeleton className='w-3/5' />
            </div>
            <Skeleton className='h-9' />
        </div>
    )
    const Categories = () => (
        <div className='flex items-center justify-center h-32 bg-gray-200'>
            <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
        </div>
    )

    const ProductCardSlider = () => (
        <div className='flex items-center justify-center bg-gray-200 h-96 mb-4'>
            <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
        </div>
    )
    const bannar = () => (
        <div className='flex items-center justify-center w-full h-64 sm:h-80 md:h-[438px] object-cover bg-gray-200'>
            <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
        </div>
    )

    if (type === "productCard") return Array(repeat).fill(<ProductCardLoading />);
    if (type === "categories") return Array(repeat).fill(<Categories />);
    if (type === "productCardSlider") return Array(repeat).fill(<ProductCardSlider />);
    if (type === "bannar") return Array(repeat).fill(<BannarLoading />);
}