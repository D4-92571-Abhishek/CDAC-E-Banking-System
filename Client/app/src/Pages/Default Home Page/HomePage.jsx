import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const HomePage = () => {
  
  useEffect(() => {
    // Apply page-specific background
    document.body.style.backgroundColor = "#e0e7ff";

    // Cleanup when leaving the page
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  return (
    <div className="d-flex flex-column min-vh-100">
      <div>
        <Navbar />
        <Outlet />
      </div>
      <div className="mt-auto text-center">
        <footer className="text-center py-4">
          <div className="d-flex justify-content-center flex-wrap gap-3 mb-2">
            <Link to="privacy" className="text-secondary text-decoration-none">
              Privacy Policy
            </Link>
            <Link to="terms-and-services" className="text-secondary text-decoration-none">
              Terms of Service
            </Link>
            <Link to="contact-us" className="text-secondary text-decoration-none">
              Contact Support
            </Link>
          </div>
          <p className="text-muted small m-0">
            © 2024 Bankify. All rights reserved. Member FDIC.
          </p>
        </footer>
      </div>
    </div>
  );
};
