import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { capturePayment } from '../../features/order/orderSlice'

function PaypalReturn() {

    const dispatch = useDispatch()
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId')
    const payerId = params.get('PayerID')

    console.log(paymentId, payerId);


    useEffect(() => {
        if (paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem('orderId'))
            dispatch(capturePayment({
                paymentId, payerId, orderId
            })).then(data => {
                if (data.payload.success) {
                    sessionStorage.removeItem('orderId')
                    window.location.href = '/payment-success'
                }
            })
        }
    }, [paymentId, payerId])
    return (
        <div>
            please wait - payment loading...
        </div>
    )
}

export default PaypalReturn
