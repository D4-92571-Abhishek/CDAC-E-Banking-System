import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoanApplicationUI from "../ApplyForLoan/ApplyForLoan";
import './LoanPage.css'

export default function CurrentLoansUI() {
  const [showModal, setShowModal] = useState(false);

  const loans = [
    { name: "Home Mortgage", balance: 187500.0, rate: 3.5, payment: 12000.5, status: "ACTIVE" },
    { name: "Car Loan", balance: 22750.0, rate: 4.2, payment: 6500.0, status: "PENDING" },
    { name: "Personal Loan", balance: 5250.0, rate: 8.5, payment: 2550.0, status: "CANCELLED" },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-success-subtle text-success";
      case "PENDING":
        return "bg-warning-subtle text-warning";
      case "CANCELLED":
        return "bg-danger-subtle text-danger";
      default:
        return "bg-secondary text-dark";
    }
  };

  return (
    <>
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Loan Department</h4>

          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Apply For Loan
          </button>
        </div>

        <table className="table table-hover table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Loan Type</th>
              <th>Current Balance (₹)</th>
              <th>Interest Rate (%)</th>
              <th>Monthly Payment (₹)</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan, index) => (
              <tr key={index}>
                <td>{loan.name}</td>
                <td>{loan.balance.toLocaleString()}</td>
                <td>{loan.rate}%</td>
                <td>{loan.payment.toLocaleString()}</td>
                <td>
                  <span className={`badge rounded-pill ${getStatusClass(loan.status)}`}>
                    {loan.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Apply For Loan</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body">
                <LoanApplicationUI />
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );}
