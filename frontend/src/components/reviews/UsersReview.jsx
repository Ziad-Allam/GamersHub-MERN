import React from 'react'
import { useSelector } from 'react-redux'
import Review from './Review'

function UsersReview() {

    const { reviews } = useSelector((state) => state.reviews.reviews)

    return (
        <div className="grid gap-6 lg:p-8">
            <h2 className='text-2xl font-semibold'>Product Ratings & Reviews</h2>
            {reviews && reviews?.length > 0 ? (
                reviews.map((review) => (
                    <Review key={review._id} review={review} />
                ))
            ) : (
                <h1>No Reviews</h1>
            )}
        </div>
    )
}

export default UsersReview
