import React from "react";
import './TransactionHistory.css';

export default function TransactionHistory() {
  const transactions = [
    { date: "1/15/2024", description: "Online Purchase - Amazon", amount: -200.0 },
    { date: "1/14/2024", description: "Salary Deposit", amount: 35000.0 },
    { date: "1/13/2024", description: "ATM Withdrawal", amount: -2000.0 },
    { date: "1/12/2024", description: "Grocery Store", amount: -245.67 },
    { date: "1/11/2024", description: "Investment Return", amount: 1250.5 },
    { date: "1/10/2024", description: "Netflix Subscription", amount: -2500.0 },
  ];

  const amountColor = (amt) => (amt > 0 ? "text-success" : "text-danger");
  const amountPrefix = (amt) => (amt > 0 ? "+" : "");

  return (
    <div className="container-fluid mt-4">
      <h4 className="mb-3">Transaction History</h4>

      <table className="table table-hover table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th className="text-end">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={i}>
              <td>{t.date}</td>
              <td>
                {t.amount > 0 ? (
                  <span className="text-success fw-bold me-1">↗</span>
                ) : (
                  <span className="text-danger fw-bold me-1">↘</span>
                )}
                {t.description}
              </td>
              <td className={`text-end fw-semibold ${amountColor(t.amount)}`}>
                {amountPrefix(t.amount)}{Math.abs(t.amount).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
