import React from 'react'
import { OrbitProgress, ThreeDot } from 'react-loading-indicators'
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
        <div className='flex items-center justify-center h-32 '>
            <ThreeDot color="#111114" size="small" />
        </div>
    )

    const ProductCardSlider = () => (
        <div className='flex items-center justify-center bg-gray-200 h-96 mb-4'>
            <ThreeDot color="#111114" size="small" />
        </div>
    )
    const Bannar = () => (
        <div className='flex items-center justify-center w-full h-64 sm:h-80 md:h-[438px] object-cover bg-gray-200'>
            <ThreeDot color="#111114" size="small" />
        </div>
    )
    const SpinnerLoading = () => (
        <div className={`fixed z-50 inset-0 bg-gray-200 bg-opacity-80 transition-opacity`}>
            <OrbitProgress color="#111114" size="small" /></div>
    )

    if (type === "productCard") return Array(repeat).fill(<ProductCardLoading />);
    if (type === "categories") return Array(repeat).fill(<Categories />);
    if (type === "productCardSlider") return Array(repeat).fill(<ProductCardSlider />);
    if (type === "bannar") return Array(repeat).fill(<Bannar />);
    if (type === "spinnerLoading") return Array(repeat).fill(<SpinnerLoading />);
}