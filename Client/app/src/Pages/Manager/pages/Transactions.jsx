import { useEffect, useState } from "react";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import {
  getActiveCustomers,
  getCustomerTransactions,
} from "../../../services/transaction";

export default function Transactions() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadActiveCustomers();
  }, []);

  const loadActiveCustomers = async () => {
    const res = await getActiveCustomers();
    setCustomers(res.data);
  };

  const handleViewTransactions = async (customer) => {
    setLoading(true);
    setSelectedCustomer(customer);
    setShowModal(true);

    const res = await getCustomerTransactions(customer.userId);
    setTransactions(res.data);

    setLoading(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setTransactions([]);
    setSelectedCustomer(null);
  };

  return (
    <div className="content">
      <Header />
      <h5>Dashboard Overview</h5>
      <StatsCards />

      {/* ACTIVE CUSTOMERS */}
      <div className="card p-4 mb-4">
        <h5>Active Customers</h5>

        <table className="table mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((cust) => (
              <tr key={cust.userId}>
                <td>{cust.name}</td>
                <td>{cust.email}</td>
                <td>{cust.contactNo}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleViewTransactions(cust)}
                  >
                    View Transactions
                  </button>
                </td>
              </tr>
            ))}

            {customers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No active customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* TRANSACTION MODAL */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">
              
              <div className="modal-header">
                <h5 className="modal-title">
                  Transaction History —{" "}
                  <span className="text-primary">
                    {selectedCustomer?.name}
                  </span>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>

              <div className="modal-body">
                {loading ? (
                  <p>Loading transactions...</p>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date & Time</th>
                      </tr>
                    </thead>

                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.transactionId}>
                          <td>{tx.transactionId}</td>
                          <td>
                            <span
                              className={`badge ${
                                tx.transactionType === "CREDITED"
                                  ? "bg-success"
                                  : tx.transactionType === "DEBITED"
                                  ? "bg-danger"
                                  : "bg-primary"
                              }`}
                            >
                              {tx.transactionType}
                            </span>
                          </td>
                          <td>₹{tx.amount}</td>
                          <td>{tx.transactionDescription}</td>
                          <td>
                            {new Date(tx.transactionTime).toLocaleString()}
                          </td>
                        </tr>
                      ))}

                      {transactions.length === 0 && (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No transactions found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MODAL BACKDROP */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}
