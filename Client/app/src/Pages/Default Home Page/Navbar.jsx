import React from "react";
import bankLogo from "../../images/bank-account.png";
import { Link } from "react-router";
import "./home.css"

export const Navbar = () => {
  return (
    <div className="home-page">
      <div>
        <nav className="mt-3 d-flex p-3">
          <div className="ms-2" style={{ width: "14%", paddingLeft: "2rem" }}>
            <img src={bankLogo} alt="" height={100} />
          </div>
          <div
            className="d-flex justify-content-evenly border border-dark p-4"
            style={{ width: "80%" }}
          >
            <div>
              <Link to="/home" className="nav-link fs-3 fw-semibold">Home</Link>
            </div>
            <div>
              <Link to="/about" className="nav-link fs-3 fw-semibold">About</Link>
            </div>
            <div>
              <Link to="/services" className="nav-link fs-3 fw-semibold">Services</Link>
            </div>
            <div>
              <Link to="/contact-us" className="nav-link fs-3 fw-semibold">Contact Us</Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
