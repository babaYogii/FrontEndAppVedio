import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'




const ProtectedRoutes = () => {

  localStorage.getItem('token')

  return (
    localStorage.getItem('token') ? <Outlet/>:<Navigate to="/signin" />  
  )
}

export default ProtectedRoutes