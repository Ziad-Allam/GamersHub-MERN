import React from 'react'
import StarRating from './StarRating'

function AverageRating({averageRating}) {
    return (
        <div className='flex items-center gap-2'>
            <div className='flex items-center'>
                <StarRating rating={averageRating} readOnly/>
            </div>
            <div>
                <span>({averageRating.toFixed(2)})</span>
            </div>
        </div>
    )
}

export default AverageRating
