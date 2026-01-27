import React, { useState, useEffect } from "react";
import bankLogo from "../../images/bank-account.png";
// import { useNavigate } from "react-router";
import "./Home.css";
import { Link, Outlet, useNavigate, useLocation } from "react-router";

const LoginLogoutPage = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // Apply page-specific background
    document.body.style.background =
      "linear-gradient(135deg, #212529 0%, #495057 100%)";

    // Cleanup when leaving the page
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    if (location.state?.from === "loginbtn") {
      setShow(true);
    }
    if (location.state?.from === "registerbtn") {
      setShow(false);
    }
  }, [location.state]);
  const register = () => {
    setShow(false);
    navigate("register");
  };
  const login = () => {
    setShow(true);
    navigate("login");
  };
  return (
    <div className="">
      <div className="d-flex justify-content-center align-items-center mt-5">
        <img src={bankLogo} alt="logo" height={50} className="me-2" />
        <h1 className="fw-bold mt-3 text-light">Bankify</h1>
      </div>

      <p className="text-secondary mt-2 text-center">
        Your trusted partner for secure and convenient online banking
      </p>

      <div
        className="d-flex justify-content-between mx-auto mt-4 p-1 rounded-4"
        style={{ backgroundColor: "#f2f2f2ff", maxWidth: "38rem" }}
      >
        <button
          className={`flex-fill btn border-0 rounded-4 fw-semibold text-light ${
            show ? "bg-dark" : "text-dark"
          }`}
          onClick={login}
        >
          Sign In
        </button>

        <button
          className={`flex-fill btn border-0 rounded-4 fw-semibold text-light ${
            !show ? "bg-dark" : "text-dark"
          }`}
          onClick={register}
        >
          Sign Up
        </button>
      </div>

      <div className="d-flex justify-content-center mt-3 px-3">
        <Outlet />
        {/* <div className="w-100">{show ? <Login /> : <Register />}</div> */}
      </div>

      <div>
        <p
          className="text-secondary mt-3 text-center"
          style={{ fontSize: ".9rem" }}
        >
          Your information is encrypted and secure. We never store your
          passwords in plain text.
        </p>
      </div>

      <div className="" style={{ backgroundColor: "" }}>
        <footer className="text-center py-4">
          <div className="d-flex justify-content-center flex-wrap gap-3 mb-2">
            <Link to="/privacy" className="text-secondary text-decoration-none">
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-services"
              className="text-secondary text-decoration-none"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact-us"
              className="text-secondary text-decoration-none"
            >
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

export default LoginLogoutPage;
