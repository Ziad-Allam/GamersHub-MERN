import React, { useState } from 'react'
import StarRating from '../rating/StarRating'
import { addReview, getReviews } from '../../features/reviews/reviewsSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

function AddReview() {

    const dispatch = useDispatch()

    const [reviewMsg, seatReviewMsg] = useState("")
    const [rating, setRating] = useState(0)

    function handleAddReview() {
        dispatch(addReview({
            productId: productDetails?._id,
            userId: user?.id,
            userName: user?.firstname,
            message: reviewMsg,
            rating: rating
        })).then((data) => {
            if (data.payload.success) {
                setRating(0)
                seatReviewMsg('')
                dispatch(getReviews(productDetails?._id))
                toast.success('Review added successfully')
            }
        })
    }

    function handleRatingChange(getRating) {
        setRating(getRating)
    }

    return (
        <div className='flex flex-col gap-6 lg:p-8'>
            <label className='text-2xl font-semibold'>Write a review</label>
            <div className='grid gap-4'>
                <div className='flex gap-1'>
                    <StarRating rating={rating} handleRatingChange={handleRatingChange} />
                </div>
                <input className='bg-gray-100 p-4' type="text" name='reviewMsg' value={reviewMsg} onChange={(event) => seatReviewMsg(event.target.value)} placeholder='Write a review...' />
                <button className='bg-blue-600 sm:w-1/5 p-2 rounded-md text-white' onClick={handleAddReview} disabled={reviewMsg.trim() === ""}>Submit</button>
            </div>
        </div>
    )
}

export default AddReview
