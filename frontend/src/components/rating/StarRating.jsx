import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";

function StarRating({ rating, handleRatingChange, readOnly = false }) {

    const [hover, setHover] = useState(0);

    return (
        [1, 2, 3, 4, 5].map((star, index) =>
            // <button
            //     key={index}
            //     onClick={handleRatingChange ? () => handleRatingChange(star) : null}
            //     className={`p-0.5 rounded-full transition-colors ${star <= rating ? 'text-yellow-500 ' : 'text-black hover:text-yellow-500'}`}>
            //     <div className={`${star <= rating ? 'fill-yellow-500' : 'fill-black'}`} >
            //         <FaStar />
            //     </div>
            // </button>
            // <button
            //     key={index}
            //     onClick={handleRatingChange ? () => handleRatingChange(star) : null}
            //     className={'p-0.5 rounded-full transition-colors'}>

            //     <FaStar className={`${star <= rating ? 'text-yellow-500' : 'text-black hover:text-yellow-500'}`} />

            // </button>
            <button
                key={index}
                onClick={!readOnly && handleRatingChange ? () => handleRatingChange(star) : null}
                className={`p-0.5 rounded-full transition-colors ${readOnly ? 'cursor-default' : 'cursor-pointer'
                    }`}
                onMouseEnter={() => !readOnly && setHover(star)} // Track which star is hovered
                onMouseLeave={() => !readOnly && setHover(0)}   // Reset hover state when the mouse leaves
            >

                <FaStar className={`${star <= (hover || rating) ? 'text-yellow-500' : 'text-black'}`} />

            </button>
        )
    )
}

export default StarRating
