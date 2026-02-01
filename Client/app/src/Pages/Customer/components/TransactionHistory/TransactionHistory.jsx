import React, { useEffect, useState } from "react";
import "./TransactionHistory.css";
import { ArrowDownLeft, ArrowUpRight, Calendar, Search } from "lucide-react";
import axios from "axios";
import Transactions from "./../../../Manager/pages/Transactions";

export default function TransactionHistory() {
  const [filterType, setFilterType] = useState("all");

  const [transactionHistory, setTransactionHistory] = useState([]);
  const [transData, setTransData] = useState({});

  const fetchTransHistoryData = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8080/bankify/customers/transactions/${sessionStorage.getItem("userId")}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );
      setTransactionHistory(data.data.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(transData);
  const fetchTransData = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8080/bankify/customers/get-transaction-details/${sessionStorage.getItem("userId")}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );
      setTransData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTransHistoryData();
    fetchTransData();
  }, []);

  console.log(transactionHistory);
  console.log(transData);

  

  const getTransactionIcon = (type) => {
    if (type === "CREDITED") {
      return <ArrowUpRight size={20} className="text-success" />;
    } else if (type === "DEBITED") {
      return <ArrowDownLeft size={20} className="text-danger" />;
    }
    return null;
  };

  const getStatusBadge = (type) => {
    switch (type) {
      case "CREDITED":
        return (
          <span
            className="badge bg-success-light text-success"
            style={{ backgroundColor: "rgba(40, 167, 69, 0.1)" }}
          >
            CREDITED
          </span>
        );
      case "DEBITED":
        return (
          <span
            className="badge bg-danger-light text-danger"
            style={{ backgroundColor: "rgba(220, 53, 69, 0.1)" }}
          >
            DEBITED
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="mt-4 mb-4">
        <h2 className="fw-bold text-dark mb-2">Transaction History</h2>
        <p className="text-muted">View and manage all your transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-2">Current Balance</p>
                  <h4 className="fw-bold text-success mb-0">
                    ₹{transData?.currentBalance}
                  </h4>
                </div>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "rgba(40, 167, 69, 0.1)",
                  }}
                >
                  <ArrowUpRight size={28} className="text-success" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-2">Total Expense</p>
                  <h4 className="fw-bold text-danger mb-0">
                    ₹{transData?.totalOutGoingAmount}
                  </h4>
                </div>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "rgba(220, 53, 69, 0.1)",
                  }}
                >
                  <ArrowDownLeft size={28} className="text-danger" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-2">Net Transaction</p>
                  <h4 className="fw-bold text-primary mb-0">
                    ₹
                    {(
                      transData.totalIncomingAmount -
                      transData.totalOutGoingAmount
                    ).toFixed(2)}
                  </h4>
                </div>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "rgba(102, 126, 234, 0.1)",
                  }}
                >
                  <Calendar size={28} style={{ color: "#667eea" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead style={{ backgroundColor: "rgba(102, 126, 234, 0.05)" }}>
              <tr>
                <th className="border-0 py-4 px-4 fw-semibold text-dark">
                  Date
                </th>
                <th className="border-0 py-4 px-4 fw-semibold text-dark">
                  Description
                </th>
                <th className="border-0 py-4 px-4 fw-semibold text-dark">
                  Type
                </th>
                <th className="border-0 py-4 px-4 fw-semibold text-dark">
                  Status
                </th>
                <th className="border-0 py-4 px-4 fw-semibold text-dark text-end">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory && transactionHistory.length > 0 ? (
                transactionHistory?.map((value) => (
                  <tr
                    key={value.id}
                    className="border-bottom hover-row"
                    style={{ cursor: "pointer" }}
                  >
                    <td className="py-4 px-4">
                      <small className="text-muted fw-semibold">
                        {new Date(value.transactionTime).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </small>
                    </td>
                    <td className="py-4 px-4">
                      <div className="d-flex align-items-center gap-2">
                        {getTransactionIcon(value.transactionType)}
                        <span className="fw-semibold text-dark">
                          {value.transactionDescription}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(value.transactionType)}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className="badge bg-success-light text-dark"
                        style={{ backgroundColor: "rgba(40, 87, 167, 0.1)" }}
                      >
                        {value.transactionStatus}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-end">
                      <span
                        className={`fw-bold ${value.amount > 0 ? "text-success" : "text-danger"}`}
                      >
                        {value.amount > 0 ? "" : ""}₹
                        {Math.abs(value.amount).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-5 px-4 text-center text-muted">
                    <p className="mb-0">No transactions found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {/* <div className="card border-0 shadow-sm rounded-3 mt-4 p-4">
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Showing {transactionHistory.length} transactions
          </small>
          <nav>
            <ul className="pagination mb-0">
              <li className="page-item">
                <a className="page-link rounded-2" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link rounded-2" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link rounded-2" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link rounded-2" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div> */}
    </div>
  );
}
