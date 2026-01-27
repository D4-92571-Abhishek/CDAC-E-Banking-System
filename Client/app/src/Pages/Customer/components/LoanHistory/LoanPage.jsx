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
import axios from "axios";

export default function CurrentLoansUI() {
  const [allLoans, setAllLoans] = useState();

  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [loanType, setLoanType] = useState("");

  const applyForLoan = async () => {
    const body = {
      amount: amount,
      interest: interest,
      loanTenureYears: calculateTenureYears(tenure),
      loanType: loanType,
    };
    const response = await axios.post(
      `http://localhost:8080/bankify/customers/loan/request-new-loan/${sessionStorage.getItem("userId")}`,
      body,
      {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      },
    );
    console.log(response);
  };

  const calculateTenureYears = (months) => {
    return months / 12;
  };

  const fetchAllLoans = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8080/bankify/customers/loan/all-loans/${sessionStorage.getItem("userId")}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );
      setAllLoans(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchAllLoans();
  }, []);

  console.log(allLoans);

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
      case "REJECTED":
        return "badge bg-danger-subtle text-danger";
      default:
        return "badge bg-secondary text-dark";
    }
  };

  const totalBalance =
    allLoans?.reduce((sum, loan) => sum + loan.currentBalance, 0) || 0;
  const activeLoans =
    allLoans?.filter((l) => l.loanStatus === "ACTIVE").length || 0;
  const totalMonthlyPayment =
    allLoans
      ?.filter((l) => l.loanStatus === "ACTIVE")
      .reduce((sum, loan) => sum + loan.monthlyPayment, 0) || 0;

  return (
    <>
      <div className="container-fluid">
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
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {allLoans?.map((loan) => (
                  <tr
                    key={loan.id}
                    style={{ borderBottom: "1px solid #e9ecef" }}
                  >
                    <td className="py-4 px-4">
                      <span className="fw-semibold text-dark">
                        {loan.loanType}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="fw-semibold">
                        ₹ {loan.currentBalance}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-muted">{loan.interest}%</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="fw-semibold">
                        ₹ {loan.monthlyPayment}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="d-flex align-items-center">
                        {getStatusIcon(loan.loanStatus)}
                        <span className={getStatusClass(loan.loanStatus)}>
                          {loan.loanStatus}
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
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content border-0 rounded-3">
              <div
                className="modal-header border-0 p-4"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                }}
              >
                <div>
                  <h5 className="modal-title fw-bold mb-0">Apply For Loan</h5>
                  <small style={{ opacity: 0.9 }}>
                    Complete the form below to submit your loan application
                  </small>
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
                    <label className="form-label fw-semibold mb-2">
                      Loan Type
                    </label>
                    <select
                      className="form-select rounded-2"
                      style={{ borderColor: "#e0e0e0", padding: "10px 12px" }}
                      onChange={(e)=>setLoanType(e.target.value)}
                    >
                      <option>Select loan type</option>
                      <option value="Personal">Personal Loan</option>
                      <option value="Home">Home Loan</option>
                      <option value="Education">Education Loan</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label fw-semibold mb-2">
                      Loan Amount (₹)
                    </label>
                    <input
                      type="number"
                      className="form-control rounded-2"
                      placeholder="Enter amount in ₹"
                      onChange={(e)=>setAmount(e.target.value)}
                      style={{ borderColor: "#e0e0e0", padding: "10px 12px" }}
                    />
                    <small className="text-muted">
                      Between ₹10,000 - ₹50,00,000
                    </small>
                  </div>
                  <div>
                    <label className="form-label fw-semibold mb-2">
                      Loan Interest (%)
                    </label>
                    <input
                      type="number"
                      className="form-control rounded-2"
                      placeholder="Enter interest rate in %"
                      onChange={(e)=>setInterest(e.target.value)}
                      style={{ borderColor: "#e0e0e0", padding: "10px 12px" }}
                    />
                    <small className="text-muted">
                      Between 5% - 25%
                    </small>
                  </div>

                  <div>
                    <label className="form-label fw-semibold mb-2">
                      Loan Tenure (months)
                    </label>
                    <select
                      className="form-select rounded-2"
                      onChange={(e) => setTenure(e.target.value)}
                      style={{ borderColor: "#e0e0e0", padding: "10px 12px" }}
                    >
                      <option>Select tenure</option>
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                      <option value="24">24 months</option>
                      <option value="36">36 months</option>
                      <option value="48">48 months</option>
                      <option value="60">60 months</option>
                    </select>
                  </div>
                  <div className="d-flex gap-2 mt-3">
                    <button
                      type="submit"
                      className="btn btn-primary flex-fill rounded-2 fw-semibold"
                      onClick={applyForLoan}
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Submit Application
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary flex-fill rounded-2 fw-semibold"
                      data-bs-dismiss="modal"
                    >
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
