import React from 'react'
import Input from '../ui/Input';

function Form({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) {

    function renderElementByElementType(getControlItems) {
        let element = null

        // formData: to get the value
        const value = formData[getControlItems.name] || ''

        switch (getControlItems.elementType) {
            case 'input':
                element = (
                    <Input
                        type={getControlItems.type}
                        name={getControlItems.name}
                        placeholder={getControlItems.placeholder}
                        id={getControlItems.id}
                        value={value}
                        onChange={event => setFormData({ ...formData, [getControlItems.name]: event.target.value })}
                    />
                );
                break;
            case 'select':
                element = (
                    <select className='border px-3 py-2 rounded-md'
                        onChange={event => setFormData({ ...formData, [getControlItems.name]: event.target.value })}
                        value={value}
                        name="" id=""
                    >
                        <option value="" disabled>
                            Select
                        </option>

                        {
                            getControlItems.options && getControlItems.options.length > 0 ?
                                getControlItems.options.map(optionItems => (
                                    <option key={optionItems.id} value={optionItems.id}>{optionItems.title}</option>
                                )) : null
                        }
                    </select>
                );
                break;
            case 'textarea':
                element = (
                    <textarea className='border px-3 py-2 rounded-md'
                        name={getControlItems.name}
                        placeholder={getControlItems.placeholder}
                        id={getControlItems.id}
                        value={value}
                        onChange={event => setFormData({ ...formData, [getControlItems.name]: event.target.value })}
                    >
                    </textarea>
                );
                break;

            default:
                element = (
                    <Input
                        type={getControlItems.type}
                        name={getControlItems.name}
                        placeholder={getControlItems.placeholder}
                        id={getControlItems.id}
                        onChange={event => setFormData({ ...formData, [getControlItems.name]: event.target.value })}
                    />
                );
                break;
        }

        return element
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
                {
                    formControls.map(controlItems => {
                        return (
                            <div className='grid w-full gap-1.5' key={controlItems.name}>
                                <label htmlFor="" className='mb-1 font-semibold capitalize'>{controlItems.label}</label>
                                {
                                    renderElementByElementType(controlItems)
                                }
                            </div>
                        )
                    })
                }
            </div>
            <button disabled={isBtnDisabled} type='submit' className='mt-6 w-full bg-yellow-500 py-2 rounded-md font-semibold capitalize'>{buttonText || 'Submit'}</button>
        </form>
    )
}

export default Form
