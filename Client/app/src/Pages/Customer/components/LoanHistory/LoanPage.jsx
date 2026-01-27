import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoanApplicationUI from "../ApplyForLoan/ApplyForLoan";
import "./LoanPage.css";
import {
  CreditCard,
  TrendingDown,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

export default function CurrentLoansUI() {
  const loans = [
    {
      id: 1,
      name: "Home Mortgage",
      balance: 187500.0,
      rate: 3.5,
      payment: 12000.5,
      status: "ACTIVE",
      remaining: "15 years",
    },
    {
      id: 2,
      name: "Car Loan",
      balance: 22750.0,
      rate: 4.2,
      payment: 6500.0,
      status: "PENDING",
      remaining: "3 years",
    },
    {
      id: 3,
      name: "Personal Loan",
      balance: 5250.0,
      rate: 8.5,
      payment: 2550.0,
      status: "CANCELLED",
      remaining: "N/A",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle size={20} className="text-success me-2" />;
      case "PENDING":
        return <Clock size={20} className="text-warning me-2" />;
      case "CANCELLED":
        return <XCircle size={20} className="text-danger me-2" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "ACTIVE":
        return "badge bg-success-subtle text-success";
      case "PENDING":
        return "badge bg-warning-subtle text-warning";
      case "CANCELLED":
        return "badge bg-danger-subtle text-danger";
      default:
        return "badge bg-secondary text-dark";
    }
  };

  const totalBalance = loans.reduce((sum, loan) => sum + loan.balance, 0);
  const activeLoans = loans.filter((l) => l.status === "ACTIVE").length;
  const totalMonthlyPayment = loans
    .filter((l) => l.status === "ACTIVE")
    .reduce((sum, loan) => sum + loan.payment, 0);

  return (
    <>
      <div className="container-fluid">
        {/* Header */}
        <div className="mb-4 mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="fw-bold text-dark mb-1">Your Loans</h3>
              <p className="text-muted mb-0">
                Manage and track all your active loans
              </p>
            </div>
            <button
              className="btn btn-primary rounded-2 py-2 px-4 fw-semibold"
              data-bs-toggle="modal"
              data-bs-target="#applyforLoanModal"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
              }}
            >
              <CreditCard
                size={18}
                className="me-2"
                style={{ marginBottom: "2px" }}
              />
              Apply For Loan
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div
              className="card border-0 rounded-3 p-4"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-1">Total Balance</p>
                  <h5 className="fw-bold text-dark mb-0">
                    ₹ {totalBalance.toLocaleString()}
                  </h5>
                </div>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "rgba(220, 53, 69, 0.1)",
                  }}
                >
                  <TrendingDown size={24} className="text-danger" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card border-0 rounded-3 p-4"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-1">Active Loans</p>
                  <h5 className="fw-bold text-dark mb-0">{activeLoans}</h5>
                </div>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "rgba(40, 167, 69, 0.1)",
                  }}
                >
                  <CheckCircle size={24} className="text-success" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card border-0 rounded-3 p-4"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-1">Monthly Payment</p>
                  <h5 className="fw-bold text-dark mb-0">
                    ₹ {totalMonthlyPayment.toLocaleString()}
                  </h5>
                </div>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "rgba(102, 126, 234, 0.1)",
                  }}
                >
                  <DollarSign size={24} className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loans Table */}
        <div
          className="card border-0 rounded-3 overflow-hidden"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
        >
          <div className="table-responsive">
            <table className="table mb-0">
              <thead style={{ backgroundColor: "rgba(102, 126, 234, 0.05)" }}>
                <tr>
                  <th className="border-0 py-4 px-4 fw-semibold text-dark">
                    Loan Type
                  </th>
                  <th className="border-0 py-4 px-4 fw-semibold text-dark">
                    Current Balance
                  </th>
                  <th className="border-0 py-4 px-4 fw-semibold text-dark">
                    Interest Rate
                  </th>
                  <th className="border-0 py-4 px-4 fw-semibold text-dark">
                    Monthly Payment
                  </th>
                  <th className="border-0 py-4 px-4 fw-semibold text-dark">
                    Remaining
                  </th>
                  <th className="border-0 py-4 px-4 fw-semibold text-dark">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr
                    key={loan.id}
                    style={{ borderBottom: "1px solid #e9ecef" }}
                  >
                    <td className="py-4 px-4">
                      <span className="fw-semibold text-dark">{loan.name}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="fw-semibold">
                        ₹ {loan.balance.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-muted">{loan.rate}%</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="fw-semibold">
                        ₹ {loan.payment.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-muted small">{loan.remaining}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="d-flex align-items-center">
                        {getStatusIcon(loan.status)}
                        <span className={getStatusClass(loan.status)}>
                          {loan.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="modal fade"
          id="applyforLoanModal"
          tabIndex="-1"
          aria-labelledby="applyforLoanLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content border-0 rounded-3">
              <div
                className="modal-header border-0 p-4"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                }}
              >
                <div>
                  <h5 className="modal-title fw-bold mb-0">Apply For Loan</h5>
                  <small style={{ opacity: 0.9 }}>Complete the form below to submit your loan application</small>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{ filter: "brightness(2)" }}
                ></button>
              </div>
              <div className="modal-body p-4">
                <form className="d-flex flex-column gap-3">
                  <div>
                    <label className="form-label fw-semibold mb-2">Loan Type</label>
                    <select className="form-select rounded-2" style={{ borderColor: "#e0e0e0", padding: "10px 12px" }}>
                      <option>Select loan type</option>
                      <option value="Personal Loan">Personal Loan</option>
                      <option value="Home Loan">Home Loan</option>
                      <option value="Education Loan">Education Loan</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label fw-semibold mb-2">Loan Amount (₹)</label>
                    <input
                      type="number"
                      className="form-control rounded-2"
                      placeholder="Enter amount in ₹"
                      style={{ borderColor: "#e0e0e0", padding: "10px 12px" }}
                    />
                    <small className="text-muted">Between ₹10,000 - ₹50,00,000</small>
                  </div>

                  <div>
                    <label className="form-label fw-semibold mb-2">Loan Tenure (months)</label>
                    <select className="form-select rounded-2" style={{ borderColor: "#e0e0e0", padding: "10px 12px" }}>
                      <option>Select tenure</option>
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                      <option value="24">24 months</option>
                      <option value="36">36 months</option>
                      <option value="48">48 months</option>
                      <option value="60">60 months</option>
                    </select>
                  </div>


                  <div>
                    <label className="form-label fw-semibold mb-2">Monthly Income (₹)</label>
                    <input
                      type="number"
                      className="form-control rounded-2"
                      placeholder="Enter monthly income in ₹"
                      style={{ borderColor: "#e0e0e0", padding: "10px 12px" }}
                    />
                  </div>

                  <div>
                    <label className="form-label fw-semibold mb-2">Loan Purpose</label>
                    <textarea
                      className="form-control rounded-2"
                      placeholder="Describe the purpose of the loan"
                      rows="3"
                      style={{ borderColor: "#e0e0e0", padding: "10px 12px" }}
                    ></textarea>
                  </div>

                  <div className="d-flex gap-2 mt-3">
                    <button type="submit" className="btn btn-primary flex-fill rounded-2 fw-semibold" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", border: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      Submit Application
                    </button>
                    <button type="button" className="btn btn-outline-secondary flex-fill rounded-2 fw-semibold" data-bs-dismiss="modal">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
}
