import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
   const navigate=useNavigate();
    useEffect(()=>{
        localStorage.clear();
        navigate('/')
    },[navigate])

  return (
    <div>

    </div>
  )
}

export default Logout