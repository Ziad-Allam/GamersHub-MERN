import React, { useState } from 'react'
import Header from './Header'
import Sidebar from "./sidebar/Sidebar";
import { Outlet } from 'react-router-dom'

function Layout() {

    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <div className='flex min-h-screen w-full'>
            {/* admin sidebar */}
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
            <div className="flex flex-1 flex-col">
                {/* common header */}
                <Header open={openSidebar} setOpen={setOpenSidebar} />
                <main className='flex-1 flex-col flex bg-muted/40 p-4 md:p-6 mx-auto 2xl:container w-full'>
                    <Outlet />
                </main>
            </div>
        </div>

        //         <div>

        //     <Header open={openSidebar} setOpen={setOpenSidebar} />
        //     <div className='flex min-h-screen w-full'>

        //         {/* admin sidebar */}
        //         <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
        //         <div className="flex flex-1 flex-col">
        //             {/* common header */}
        //             <main className='flex-1 flex-col flex bg-muted/40 p-4 md:p-6 mx-auto 2xl:container'>
        //                 <Outlet />
        //             </main>
        //         </div>
        //     </div>

        // </div>



    )
}

export default Layout
