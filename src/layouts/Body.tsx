import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Body = () => {
  return (
    <div className='h-100'>
    <Outlet></Outlet>
    <ToastContainer /> 
    </div>
  )
}

export default Body
