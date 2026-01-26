import React from "react";
import bankLogo from "../../images/bank-account.png";
import { Link } from "react-router-dom";
import "./navbar.css"

export const Navbar = () => {
  return (
    <nav className="navbar-wrapper">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={bankLogo} alt="Bankify Logo" height={50} />
          <span className="logo-text">Bankify</span>
        </div>
        
        <div className="navbar-links">
          <Link to="/home" className="nav-link" >
            <span className="text-white">Home</span>
          </Link>
          <Link to="/about" className="nav-link">
            <span className="text-white">About</span>
          </Link>
          <Link to="/services" className="nav-link">
            <span className="text-white">Services</span>
          </Link>
          <Link to="/contact-us" className="nav-link">
             <span className="text-white">Contact Us</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
