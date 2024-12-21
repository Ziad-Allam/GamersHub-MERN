import React from 'react'
import Input from '../ui/Input';

function Form({ formControls, formData, setFormData, onSubmit, buttonText }) {

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
                    <select
                        onChange={event => setFormData({ ...formData, [getControlItems.name]: event.target.value })}
                        value={value}
                        name="" id=""
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItems.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItems.options && getControlItems.options.length > 0 ?
                                    getControlItems.options.map(optionItems => {
                                        <SelectItem key={optionItems.id} value={optionItems.id}>{optionItems.label}</SelectItem>
                                    }) : null
                            }
                        </SelectContent>
                    </select>
                );
                break;
            case 'textarea':
                element = (
                    <textarea
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
            <button type='submit' className='mt-6 w-full bg-orange-400 py-2 rounded-md font-semibold capitalize'>{buttonText || 'Submit'}</button>
        </form>
    )
}

export default Form
