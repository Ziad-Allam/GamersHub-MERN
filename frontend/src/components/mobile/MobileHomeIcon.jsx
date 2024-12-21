import React from 'react'
import { IoHomeOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

function MobileHomeIcon() {
  return (
    <Link to="/">
      <IoHomeOutline size={24} />
    </Link>
  )
}
export default MobileHomeIcon