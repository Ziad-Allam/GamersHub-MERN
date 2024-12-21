import React from 'react'
import { IoCheckmarkCircle } from 'react-icons/io5'
import StarRating from '../rating/StarRating';

function Review({ review }) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate(); // Get the day of the month (1-31)
        const month = date.toLocaleString('en-US', { month: 'short' }); // Get the abbreviated month
        const year = date.getFullYear(); // Get the year

        return `${day} ${month}, ${year}`;
    };

    return (
        <div className='flex flex-col gap-2'>

            <div className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-300 border rounded-full">
                    {review?.userName[0]?.toUpperCase()}
                </div>
                <div className='flex flex-col'>
                    <div className='flex items-center gap-6'>
                        <h3 className="font-medium capitalize">{review?.userName}</h3>
                        <div className='flex items-center gap-1 text-sm'>
                            <IoCheckmarkCircle className='text-green-500' />
                            <span className='text-xs opacity-55'>Verified Purchase</span>
                        </div>
                    </div>
                    <p className='text-xs opacity-65'>{formatDate(review.createdAt)}</p>
                </div>

            </div>

            <div className='flex flex-col gap-2'>
                <div className="">
                    <div className="flex items-center gap-0.5 text-xs">
                        <StarRating rating={review?.rating} readOnly/>
                    </div>
                    <p className="text-sm md:text-base">
                        {review.message}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Review
