import React, { useState } from "react";
import "./ReceivePayment.css";

export default function ReceivePayment() {
  const [activeTab, setActiveTab] = useState("qr");

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="mb-0">Welcome back, Rohit Patil</h5>
          <small className="text-muted">Sunday, September 21, 2025</small>
        </div>

        <div className="d-flex gap-3 fs-5">
          <i className="bi bi-bell"></i>
          <i className="bi bi-person-circle"></i>
        </div>
      </div>

      <h6 className="fw-semibold mb-3">Receive Payment</h6>

      <div
        className="d-flex bg-light rounded-pill p-1 mb-3"
        style={{ width: "250px" }}
      >
        <button
          className={`flex-fill btn rounded-pill ${
            activeTab === "qr" ? "btn-dark text-white" : "btn-light"
          }`}
          onClick={() => setActiveTab("qr")}
        >
          QR Code
        </button>

        <button
          className={`flex-fill btn rounded-pill ${
            activeTab === "received" ? "btn-dark text-white" : "btn-light"
          }`}
          onClick={() => setActiveTab("received")}
        >
          Received
        </button>
      </div>

      <div className="card shadow-sm p-4">

        {activeTab === "qr" && (
          <>
            <h6 className="fw-bold mb-3">
              <i className="bi bi-qr-code-scan me-2"></i>QR Code Payment
            </h6>

            <div className="row">
              <div className="col-md-6">
                <label className="text-muted small fw-semibold">
                  Amount (Optional)
                </label>
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="0.00"
                />

                <label className="text-muted small fw-semibold">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Payment description"
                />

                <button className="btn btn-dark w-100">
                  Generate QR Code
                </button>
              </div>

              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <div
                  className="d-flex flex-column justify-content-center align-items-center border border-2 rounded"
                  style={{
                    width: "250px",
                    height: "250px",
                    borderStyle: "dashed",
                    color: "#777",
                  }}
                >
                  <i className="bi bi-qr-code fs-1 mb-2"></i>
                  <span className="text-muted small">
                    QR Code will appear here
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

\        {activeTab === "received" && (
          <div className="text-center py-5 text-muted">
            <p className="mt-3">No received payments yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
