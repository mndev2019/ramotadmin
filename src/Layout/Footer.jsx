//import React from 'react'

import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <div className="w-full fixed bottom-0 start-0 pe-4  text-gray-600 text-end text-xs">
        &copy; all right reserverd. <Link className='text-gray-800 text-xs' to={'https://ramot.cloud/'}>Ramot.cloud</Link>
      </div>
    </>
  )
}

export default Footer