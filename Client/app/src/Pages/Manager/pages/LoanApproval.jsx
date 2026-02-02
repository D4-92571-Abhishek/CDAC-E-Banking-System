import { useEffect, useState } from "react";
import {
  fetchPendingLoans,
  approveLoan,
  rejectLoan,
} from "../services/loan";

import { sendLog } from "../../../services/loggerService";
import { useRef } from "react";

export default function LoanApproval() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loggedRef = useRef(false);
  
      useEffect(() => {
          if (!loggedRef.current) {
              sendLog("MANAGER_DASHBOARD_ACCESSED", sessionStorage.getItem("userId") || "Unknown Admin");
              loggedRef.current = true;
          }
      }, []);

  const loadPendingLoans = async () => {
    try {
      setLoading(true);
      const data = await fetchPendingLoans();
      setLoans(data);
    } catch (err) {
      alert("Failed to fetch pending loans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingLoans();
  }, []);

  const handleApprove = async (loanId) => {
    try {
      await approveLoan(loanId);
      alert("Loan approved successfully!");
      loadPendingLoans();
    } catch (err) {
      alert("Error approving loan");
    }
  };

  const handleReject = async (loanId) => {
    try {
      await rejectLoan(loanId);
      alert("Loan rejected successfully!");
      loadPendingLoans();
    } catch (err) {
      alert("Error rejecting loan");
    }
  };

  // SEARCH FILTER (by customer name or loan type)
  const filteredLoans = loans.filter(
    (loan) =>
      loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.loanType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content">
      <h5 className="mb-4">Pending Loan Approvals</h5>

      <div className="card shadow-sm rounded-4 border-0">
        {/* HEADER WITH SEARCH */}
        <div className="card-header d-flex justify-content-between align-items-center bg-dark text-white rounded-top-4">
          <h6 className="mb-0">Pending Loans</h6>
          <input
            type="text"
            className="form-control form-control-sm w-25"
            placeholder="Search by name / loan type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="card-body p-0">
          <div className="table-responsive">
            {loading ? (
              <p className="text-center py-4">Loading...</p>
            ) : filteredLoans.length === 0 ? (
              <p className="text-center text-muted py-4">
                No pending loans found.
              </p>
            ) : (
              <table className="table align-middle mb-0">
                <thead className="table-primary text-white">
                  <tr>
                    <th>Loan ID</th>
                    <th>Customer</th>
                    <th>Loan Type</th>
                    <th>Amount</th>
                    <th>Interest (%)</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLoans.map((loan) => (
                    <tr
                      key={loan.loanId}
                      className="border-bottom"
                      style={{ transition: "all 0.2s ease-in-out" }}
                    >
                      {/* LOAN ID */}
                      <td className="fw-semibold">{loan.loanId}</td>

                      {/* CUSTOMER */}
                      <td className="fw-medium text-primary">
                        {loan.customerName}
                      </td>

                      {/* LOAN TYPE */}
                      <td>{loan.loanType}</td>

                      {/* AMOUNT */}
                      <td className="fw-bold">₹{loan.amount}</td>

                      {/* INTEREST */}
                      <td>{loan.interest}%</td>

                      {/* STATUS */}
                      <td>
                        <span className="badge bg-warning text-dark">
                          {loan.loanStatus}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-success rounded-pill px-3 me-2"
                          onClick={() => handleApprove(loan.loanId)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill px-3"
                          onClick={() => handleReject(loan.loanId)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
