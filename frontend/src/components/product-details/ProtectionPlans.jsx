import React from 'react'

function ProtectionPlans() {
    return (
        <>
            <p className='font-medium py-'>Protection plan:</p>
            <div className="flex gap-3 font-medium text-sm">
                <button>
                    <div className="border border-gray-400 p-2 rounded-md text-center hover:border-blue-500 focus:border-blue-500 flex flex-col justify-center min-h-full">
                        <p className="font-bold">No Plan</p>
                    </div>
                </button>
                <button>
                    <div className="border border-gray-400 p-2 rounded-md text-center hover:border-blue-500 focus:border-blue-500 flex flex-col justify-center min-h-full">
                        <p className="font-bold">1 Year</p>
                        <p className="font-bold">$150</p>
                        <p className="text-gray-500 text-xs">About $12.50/mo.</p>
                    </div>
                </button>
                <button>
                    <div className="border border-gray-400 p-2 rounded-md text-center hover:border-blue-500 focus:border-blue-500 flex flex-col justify-center min-h-full">
                        <p className="font-bold">2 Years</p>
                        <p className="font-bold">$150</p>
                        <p className="text-gray-500 text-xs">About $6.25/mo.</p>
                    </div>
                </button>
            </div>
        </>
    )
}

export default ProtectionPlans
