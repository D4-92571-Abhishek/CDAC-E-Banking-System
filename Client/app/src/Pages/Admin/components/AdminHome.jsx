import React from 'react'
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const AdminHome = () => {
  return (
      <div className='d-flex'>
      <Navbar />
      <Outlet/>
      </div>
  )
}

export default AdminHome
