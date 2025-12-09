import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './../components/Sidebar';

export const ManagerHome = () => {
  return (
     <div className='d-flex'>

        <Sidebar />
     
       <div className='m-4' style={{width:"80%"}}> <Outlet /></div>
      

    </div>
  )
}
