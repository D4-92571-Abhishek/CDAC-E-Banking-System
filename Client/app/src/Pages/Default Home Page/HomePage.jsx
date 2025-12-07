import React, { useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import bankLogo from "../../images/bank-account.png";
import { Navbar } from './Navbar';


export const HomePage = () => {

  
  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  );
};
