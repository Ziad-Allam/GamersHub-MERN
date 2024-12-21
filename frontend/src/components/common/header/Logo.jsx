import React from 'react'
import { FaComputer } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to='/' className='flex items-center gap-2 text-orange-500'>
      <span className='font-bold'>GAMERS HUB</span>
      <FaComputer size={30}/>
    </Link>
  )
}

export default Logo
