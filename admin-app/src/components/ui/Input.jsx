import React from 'react'

function Input({type,name,placeholder,id,value,onChange}) {
    return (
        <>
            <input className='border px-3 py-2 rounded-md'
                type={type}
                name={name}
                placeholder={placeholder}
                id={id}
                value={value}
                onChange={onChange}
            />
        </>
    )
}

export default Input
