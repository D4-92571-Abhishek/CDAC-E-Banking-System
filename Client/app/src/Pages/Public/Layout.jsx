import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import StatsCards from "../Manager/components/StatsCards"; // ✅ ONLY PLACE
import "./layout.css";

export const Layout = ({ bgColor = "#e0e7ff" }) => {
  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [bgColor]);

  return (
    <div className="layout-container min-vh-100">
      {/* Header */}
      <div className="layout-header">
        <Navbar />
      </div>


      {/* Page content changes here */}
      <div className="layout-content flex-grow-1">
        <Outlet />
      </div>

      {/* Footer */}
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
