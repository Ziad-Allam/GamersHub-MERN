import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProductDetails } from '../../features/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../features/reviews/reviewsSlice';
import Price from '../../components/product-details/Price';
import Availability from '../../components/product-details/Availability';
import AverageRating from '../../components/rating/AverageRating';
import DeliveryOptions from '../../components/product-details/DeliveryOptions';
import ReviewsSection from '../../components/reviews/ReviewsSection';
import ProtectionPlans from '../../components/product-details/ProtectionPlans';
import ProductDetailsActionBtns from '../../components/product-details/ProductDetailsActionBtns';
import Loading from '../../components/loading/Loading';

function ProductDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProductDetails(id))
    }, [id])

    const productDetails = useSelector((state) => state.products.productDetails?.productDetails)
    const isLoading = useSelector((state) => state.products.isLoading)
    const { reviews } = useSelector((state) => state.reviews.reviews)

    useEffect(() => {
        if (productDetails !== null) dispatch(getReviews(productDetails?._id));
    }, [productDetails]);

    const averageRating = reviews && reviews.length > 0 ? reviews.reduce((sum, reviewItem) => sum + reviewItem.rating, 0) / reviews.length : 0

    return (
        <>
            {isLoading ?
                <Loading type='spinnerLoading' />
                :
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 py-4">
                        <div className="lg:col-span-2 w-full ">
                            <img
                                src={productDetails?.image?.url}
                                alt={productDetails?.description || 'Product Image'}
                                className="w-full object-cover rounded-lg shadow-lg"
                            />
                        </div>
                        <div className='lg:col-span-2 flex flex-col gap-6'>
                            <Link to={`/shop/brands/${productDetails?.brand?.slug}/${productDetails?.brand?._id}`}>
                                <p className='uppercase hover:underline font-semibold text-blue-500'>{productDetails?.brand?.title}</p>
                            </Link>

                            <p className='font-medium text-lg sm:text-2xl'>{productDetails?.description}</p>

                            <AverageRating averageRating={averageRating} />

                            <Availability totalStock={productDetails?.totalStock} />

                            <Price price={productDetails?.price} salePrice={productDetails?.salePrice} />

                            <ProtectionPlans />

                            <DeliveryOptions />

                            <ProductDetailsActionBtns productDetails={productDetails} />
                        </div>
                        <div className="lg:col-span-1 flex flex-col gap-6">
                            some info
                        </div>

                    </div>

                    <ReviewsSection />
                </>
            }
        </>
    )
}

export default ProductDetails
