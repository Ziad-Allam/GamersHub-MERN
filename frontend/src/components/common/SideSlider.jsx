import React from 'react'
import { IoIosClose } from 'react-icons/io'
import useClickOutside from '../../hooks/useClickOutside'

function SideSlider({ isPanelOpen, setIsPanelOpen, children, title }) {

    let sidePanelRef = useClickOutside(() => {
        setIsPanelOpen(false)
    })

    return (
        <div className={`fixed z-50 inset-0 bg-black bg-opacity-80 transition-opacity ${isPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div ref={sidePanelRef} className={`fixed top-0 left-0 w-full max-w-80 h-full bg-white overflow-y-auto transition-transform ${isPanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='p-4 mt-4'>
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='text-xl font-bold text-blue-500'>{title}</h1>
                        <button onClick={() => { setIsPanelOpen(false) }} className='text-2xl'>
                            <IoIosClose size={28} />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SideSlider