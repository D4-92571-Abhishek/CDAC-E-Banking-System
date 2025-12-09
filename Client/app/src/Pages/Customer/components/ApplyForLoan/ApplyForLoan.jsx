import React from "react";
import "./ApplyForLoan.css"; 
export default function LoanApplicationUI() {
  return (
    <form className="d-flex flex-column gap-3">

      <div>
        <label className="form-label fw-semibold">Loan Type</label>
        <select className="form-select">
          <option>Select loan type</option>
        </select>
      </div>

      <div>
        <label className="form-label fw-semibold">Loan Amount</label>
        <input type="number" className="form-control" placeholder="Enter amount in ₹" />
      </div>

      <div>
        <label className="form-label fw-semibold">Loan Tenure (months)</label>
        <select className="form-select">
          <option>Select tenure</option>
        </select>
      </div>

      <div>
        <label className="form-label fw-semibold">Employment Type</label>
        <select className="form-select">
          <option>Select employment type</option>
        </select>
      </div>

      <div>
        <label className="form-label fw-semibold">Monthly Income</label>
        <input type="number" className="form-control" placeholder="Enter monthly income in ₹" />
      </div>

      <div>
        <label className="form-label fw-semibold">Loan Purpose</label>
        <input type="text" className="form-control" placeholder="Description" />
      </div>

      <div className="d-flex gap-2 mt-2">
        <button className="btn btn-dark flex-fill">Submit Application</button>
        <button className="btn btn-outline-secondary flex-fill">Save as Draft</button>
      </div>

    </form>
  );
}
