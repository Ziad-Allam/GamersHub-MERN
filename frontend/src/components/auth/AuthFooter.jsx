import React from 'react'
import { Link } from 'react-router-dom'

function AuthFooter() {
  return (
    <div>
      <ul className='flex items-center justify-center gap-4 py-10'>
        <li className='text-xs text-blue-600'><Link>Conditions of use</Link></li>
        <li className='text-xs text-blue-600'><Link>Privacy Notice</Link></li>
        <li className='text-xs text-blue-600'><Link>Help</Link></li>
      </ul>
    </div>
  )
}

export default AuthFooter
