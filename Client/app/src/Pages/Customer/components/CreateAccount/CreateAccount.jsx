import React, { useState } from "react";
import "./CreateAccount.css";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const [activeTab, setActiveTab] = useState("create");
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-start py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e8f0ff, #f8f9ff)",
      }}
    >
      <div style={{ width: "420px" }}>
        <div className="text-center mb-3">
          <h4 className="fw-bold mb-1">
          Bankify
          </h4>
          <small className="text-muted">
            Secure and convenient online banking
          </small>
        </div>

        <div className="d-flex bg-light rounded-pill p-1 mb-3 shadow-sm">
          <button
            className={`flex-fill btn rounded-pill ${
              activeTab === "signin" ? "btn-dark text-white" : "btn-light"
            }`}
            onClick={() => setActiveTab("signin")}
          >
            Sign In
          </button>

          <button
            className={`flex-fill btn rounded-pill ${
              activeTab === "create" ? "btn-dark text-white" : "btn-light"
            }`}
            onClick={() => setActiveTab("create")}
          >
            Create Account
          </button>
        </div>

        <div className="card shadow-sm p-3">
          <h6 className="fw-bold mb-1">
          Create Account
          </h6>
          <small className="text-muted">
            Join us and start banking with confidence
          </small>

          <form className="mt-3">

            <div className="row g-2 mb-2">
              <div className="col">
                <label className="form-label small fw-medium">First Name</label>
                <input className="form-control input-sm" placeholder="Rohit" />
              </div>

              <div className="col">
                <label className="form-label small fw-medium">Last Name</label>
                <input className="form-control input-sm" placeholder="Patil" />
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label small fw-medium">Email</label>
              <div className="position-relative">
                <input className="form-control input-sm ps-3" placeholder="rohit@patil.com" />
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label small fw-medium">Phone</label>
              <div className="position-relative">
                <input className="form-control input-sm ps-3" placeholder="+91 9876543210" />
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label small fw-medium">Date of Birth</label>
              <input
                className="form-control input-sm"
                placeholder="dd-mm-yyyy"
              />
            </div>

            {/* Gender */}
            <div className="mb-2">
              <label className="form-label small fw-medium">Gender</label>
              <select className="form-select input-sm">
                <option>Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-2">
              <label className="form-label small fw-medium">Address</label>
              <div className="position-relative">
                <input className="form-control input-sm ps-3" placeholder="Full address" />
              </div>
            </div>

            <div className="row g-2 mb-2">
              <div className="col">
                <label className="form-label small fw-medium">Aadhaar</label>
                <div className="position-relative">
                  <input className="form-control input-sm ps-3" placeholder="1234 5678 9012" />
                </div>
              </div>

              <div className="col">
                <label className="form-label small fw-medium">PAN</label>
                <input className="form-control input-sm" placeholder="ABCDE1234F" />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-medium">Password</label>
              <div className="position-relative">
                <input
                  type="password"
                  className="form-control input-sm ps-3"
                  placeholder="Enter Strong password"
                />
              </div>
            </div>

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="terms" />
              <label className="form-check-label small ms-1" htmlFor="terms">
                I agree to the Terms & Privacy Policy
              </label>
            </div>

            <button
              className="btn btn-dark w-100 btn-sm fw-semibold"
              onClick={() => navigate("/dashboard")}
              type="button"
            >
              Create Account
            </button>
          </form>
        </div>

        <div className="text-center mt-2 small text-muted">
          Your data is secure.
        </div>
      </div>
    </div>
  );
}
