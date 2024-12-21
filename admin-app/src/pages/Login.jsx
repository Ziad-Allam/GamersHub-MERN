import React, { useState } from 'react'
import Form from '../components/common/Form'
import { loginFormControls } from '../components/common/config'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { loginAdmin } from '../features/auth-admin/authSlice'

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
        dispatch(loginAdmin(formData)).then(data => {
            console.log(data)
            if (data?.payload?.success) {
                toast.success("logged in successfully")
            }else{
                toast.error('somthing wrong') 
            }
        })
    }

    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className="text-center">
                <h1 className='text-3xl font-bold'>Admin account</h1>
            </div>
            <Form
                formControls={loginFormControls}
                buttonText={'sign in'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    )

}

export default Login
