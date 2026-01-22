import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./DashBoard.css";

export default function DashboardUI() {

  const navigate = useNavigate();
  return (
    <div className="d-flex">


      <div className="flex-grow-1 p-4">

        <div className="d-flex justify-content-between">
          <div>
            <h5 className="fw-semibold">Welcome back, Rohit Patil</h5>
            <small className="text-secondary">Sunday, September 21, 2025</small>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="rounded-circle border p-2">
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
          <h6 className="fw-semibold">Account Overview</h6>
          <button className="btn btn-outline-secondary btn-sm rounded-pill">
           Hide Balance
          </button>
        </div>

        <div
          className="card p-3 border-0 shadow-sm rounded-4"
          style={{ maxWidth: "360px" }}
        >
          <div className="text-secondary small mb-1">Savings Account</div>
          <div className="text-secondary small mb-2">Account ****5632</div>

          <div className="d-flex align-items-end gap-2">
            <h3 className="fw-semibold mb-0">₹4,87,500.00</h3>
            <span className="text-success fw-semibold">↑ ₹3,250.00</span>
          </div>
        </div>

      </div>

    </div>
  );
}
