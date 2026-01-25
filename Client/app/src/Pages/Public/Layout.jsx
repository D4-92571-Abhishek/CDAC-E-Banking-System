import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import "./layout.css";

export const Layout = ({ bgColor = "#e0e7ff" }) => {
  useEffect(() => {
    // Apply page-specific background
    document.body.style.backgroundColor = bgColor;

    // Cleanup when leaving the page
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [bgColor]);

  return (
    <div className="layout-container d-flex flex-column min-vh-100">
      <div className="layout-header">
        <Navbar />
      </div>
      
      <div className="layout-content flex-grow-1">
        <Outlet />
      </div>

      <div className="layout-footer mt-auto">
        <footer className="footer-section">
          <div className="footer-links">
            <Link to="privacy" className="footer-link">
              Privacy Policy
            </Link>
            <Link to="terms-and-services" className="footer-link">
              Terms of Service
            </Link>
            <Link to="contact-us" className="footer-link">
              Contact Support
            </Link>
          </div>
          <p className="footer-copyright">
            © 2024 Bankify. All rights reserved. Member FDIC.
          </p>
        </footer>
      </div>
    </div>
  );
};
