import React, { useState } from 'react'
import Form from '../../components/common/Form'
import { registerFormControls } from '../../components/common/config'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
}

function Register() {

    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onSubmit(event) {
        event.preventDefault()
        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.success) {
                toast.success("User created successfully")
                navigate('/auth/login')
            } else {
                toast.error('User already exist')
            }
        })
    }

    return (
        <div className='mx-auto w-full max-w-md space-y-6 border bg-white p-6 rounded-lg'>
            <div className="text-center">
                <h1 className='text-2xl font-bold'>Create new account</h1>
            </div>
            <Form
                formControls={registerFormControls}
                buttonText={'sign up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
            <div className='border-t pt-6'>
                <p className='text-xs'>By continuing you agree to our <span className='text-blue-500'>Terms and Conditions</span>, our <span className='text-blue-500'>Privacy Policy</span></p>
                <p className="mt-2 text-sm">
                    <span className='font-medium'>
                    Already have an account?
                    </span>
                    <Link className="font-medium ml-2 text-primary hover:underline text-blue-500" to="/login">
                        Login
                    </Link>
                </p>
            </div>

        </div>
    )
}

export default Register
