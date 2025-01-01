import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeTemplate = () => {
  return (
    <div className='container-fluid p-0'>
    
    
    <div style={{minHeight:620}}>

    <Outlet></Outlet>

    </div>
   
  </div>
  )
}

export default HomeTemplate