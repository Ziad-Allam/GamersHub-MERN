import React, { useState } from 'react'
import Form from '../../components/common/Form'
import { loginFormControls } from '../../components/common/config'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    ConfirmPassword: '',
}

function Login() {
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()

    function onSubmit(event) {
        event.preventDefault()
        dispatch(loginUser(formData)).then(data => {
            console.log(data)
            if (data?.payload?.success) {
                toast.success("logged in successfully")
            }else{
                toast.error('somthing wrong') 
            }
        })
    }

    return (
        <div className='mx-auto w-full max-w-md space-y-6 border bg-white p-6 rounded-lg'>
            <div className="text-center">
                <h1 className='text-2xl font-bold'>Sign in to your account</h1>
            </div>
            <Form
                formControls={loginFormControls}
                buttonText={'sign in'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
            <p className='text-xs'>By continuing you agree to our <span className='text-blue-500'>Terms and Conditions</span>, our <span className='text-blue-500'>Privacy Policy</span></p>
            <p className="mt-2 text-sm">
                <span className='font-medium'>
                    Don't have an account?
                </span>
                    <Link className="ml-2 text-blue-500 hover:underline" to="/auth/register">
                        Create account
                    </Link>
                </p>

        </div>
    )

}

export default Login
