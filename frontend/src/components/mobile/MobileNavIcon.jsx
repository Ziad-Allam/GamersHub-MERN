import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";

function MobileNavIcon({ setOpenNavItems }) {
    return (
        <button onClick={() => { setOpenNavItems(true) }}>
            <RxHamburgerMenu size={24} />
        </button>
    )
}
export default MobileNavIcon
