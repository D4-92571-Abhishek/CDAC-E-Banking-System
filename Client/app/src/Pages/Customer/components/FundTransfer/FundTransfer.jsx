import React, { useState } from "react";
import "./FundTransfer.css";

export default function FundTransferUI() {
  const [activeTab, setActiveTab] = useState("new"); 

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      
      <div className="card p-4 border border-3 border-dark shadow-lg" style={{ maxWidth: "380px", width: "100%" }}>

        <div className="d-flex bg-light rounded-pill p-1 mb-4">
          <button
            className={`flex-fill btn rounded-pill ${activeTab === "new" ? "btn-dark text-white" : "btn-light"}`}
            onClick={() => setActiveTab("new")}
          >
            New Transfer
          </button>

          <button
            className={`flex-fill btn rounded-pill ${activeTab === "history" ? "btn-dark text-white" : "btn-light"}`}
            onClick={() => setActiveTab("history")}
          >
            Transfer History
          </button>
        </div>

        {activeTab === "new" && (
          <>
            <h2 className="h5 fw-semibold mb-3">Transfer Details</h2>

            <form className="d-flex flex-column gap-3">

              <div>
                <label className="form-label">From Account</label>
                <select className="form-select">
                  <option>Select source account</option>
                </select>
              </div>

              <div>
                <label className="form-label">Transfer Type</label>
                <select className="form-select">
                  <option>Internal Transfer</option>
                </select>
              </div>

              <div>
                <label className="form-label">To Account</label>
                <select className="form-select">
                  <option>Select destination account</option>
                </select>
              </div>

              <div>
                <label className="form-label">Amount</label>
                <input type="number" className="form-control" placeholder="0.00" />
              </div>

              <div>
                <label className="form-label">Memo (Optional)</label>
                <input type="text" className="form-control" placeholder="Enter transfer description" />
              </div>

              <button type="button" className="btn btn-dark w-100 mt-2">
                Transfer Now
              </button>

            </form>
          </>
        )}

        {activeTab === "history" && (
          <div>
            <h2 className="h5 fw-semibold mb-3">Transfer History</h2>
            <p className="text-secondary">No past transfers available.</p>
          </div>
        )}

      </div>
    </div>
  );
}